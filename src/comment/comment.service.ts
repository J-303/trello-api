import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/card.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommentDTO, CommentDTOResponse } from './comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(CardEntity)
        private cardRepository: Repository<CardEntity>
    ) {}

    async getOne(id: number) {
        const comment = await this.commentRepository.findOne({
            where:{id},
            relations:['owner','card']
        });
        if (!comment) throw new HttpException('Comment not found.', HttpStatus.NOT_FOUND);
        const commentResponse: CommentDTOResponse = comment;
        return commentResponse;
    }

    async create(cardId: number, userId: number, data: CommentDTO) {
        const user = await this.userRepository.findOne({where:{id:userId}});
        if (!user) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        const card = await this.cardRepository.findOne({
            where:{id:cardId},
            relations:['comments']
        });
        if (!card) throw new HttpException('Card not found.', HttpStatus.NOT_FOUND);
        const comment = this.commentRepository.create({
            ...data,
            owner: user,
            card: card
        });
        this.commentRepository.save(comment);
        const commentResponse: CommentDTOResponse = comment;
        return commentResponse;
    }

    async update(id: number, ownerId: number, data: CommentDTO) {
        const user = await this.userRepository.findOne({where:{id:ownerId}});
        if (!user) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        let comment = await this.commentRepository.findOne({
            where:{id},
            relations:['owner']
        });
        if (!comment) throw new HttpException('Comment not found.', HttpStatus.NOT_FOUND);
        if (comment.owner.id != ownerId) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        this.commentRepository.update(id, data);
        comment = await this.commentRepository.findOne({
            where:{id},
            relations:['owner','card']
        });
        const commentResponse: CommentDTOResponse = comment;
        return commentResponse;
    }

    async delete(id: number, ownerId: number) {
        const user = await this.userRepository.findOne({where:{id:ownerId}});
        if (!user) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        const comment = await this.commentRepository.findOne({
            where:{id},
            relations:['owner','card']
        });
        if (!comment) throw new HttpException('Comment not found.', HttpStatus.NOT_FOUND);
        if (comment.owner.id != ownerId) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        this.commentRepository.remove(comment);
        const commentResponse: CommentDTOResponse = comment;
        return commentResponse;
    }
}
