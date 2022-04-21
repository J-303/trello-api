import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CardDTO, CardDTOResponse } from './card.dto';
import { CardEntity } from './card.entity';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private cardRepository: Repository<CardEntity>,
        @InjectRepository(ColumnEntity)
        private columnRepository: Repository<ColumnEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>
    ) {}

    async getAll(columnId: number) {
        let cards = await this.cardRepository.find({
            where: {column: columnId},
            relations: ['owner', 'column']
        });
        if (!cards) throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
        return cards.map(card => {
            const cardResponse: CardDTOResponse = card;
            return cardResponse;
        });
    }

    async getOne(cardId: number) {
        const card = await this.cardRepository.findOne({
            where: {id: cardId},
            relations: ['owner', 'column', 'comments']
        });
        if (!card) throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
        let comments = (await this.commentRepository.find({
            where:{card:cardId},
            relations:['owner']
        }))
        const cardResponse: CardDTOResponse = card;
        return {
            card: cardResponse,
            comments: comments.map(comm => {
                return {
                    id: comm.id,
                    owner: {id: comm.owner.id, username: comm.owner.username},
                    content: comm.content
                }
            })
        };
    }

    async create(ownerId: number, columnId: number, data: CardDTO) {
        const user = await this.userRepository.findOne({where:{id:ownerId}});
        if (!user) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        const column = await this.columnRepository.findOne({
            where:{id:columnId},
            relations:['owner']
        });
        if (!column) throw new HttpException('Column not found.', HttpStatus.NOT_FOUND);
        if (column.owner.id != ownerId) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);        
        const card = this.cardRepository.create({
            ...data,
            owner: user,
            column: column
        })
        await this.cardRepository.save(card);
        const cardResponse: CardDTOResponse = card;
        return cardResponse;
    }

    async update(id: number, ownerId: number, data: CardDTO) {
        const user = await this.userRepository.findOne({where:{id:ownerId}});
        if (!user) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        let card = await this.cardRepository.findOne({
            where: {id},
            relations: ['owner']
        });
        if (!card) throw new HttpException('Card not found.', HttpStatus.NOT_FOUND);
        card.checkOwner(ownerId);
        this.cardRepository.update({id}, data);
        card = await this.cardRepository.findOne({
            where: {id},
            relations: ['owner','column','comments']
        });
        card.comments = await this.commentRepository.find({
            where:{card},
            relations: ['owner']
        });
        const cardResponse: CardDTOResponse = card;
        return cardResponse;
    }

    async delete(id: number, ownerId: number) {
        const user = await this.userRepository.findOne({where:{id:ownerId}});
        if (!user) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        const card = await this.cardRepository.findOne({
            where:{id},
            relations:['owner','column','comments']
        });
        if (!card) throw new HttpException('Card not found.', HttpStatus.NOT_FOUND);
        card.checkOwner(ownerId);
        await this.commentRepository.delete({card});
        this.cardRepository.delete({id});
        const cardResponse: CardDTOResponse = card;
        return cardResponse;
    }
}
