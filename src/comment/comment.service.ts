import { Injectable, NotFoundException } from '@nestjs/common';
import { CardRepository } from 'src/card/card.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.dto';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
    constructor(
        private commentRepo: CommentRepository,
        private userRepo: UserRepository,
        private cardRepo: CardRepository,
    ) {}

    async getMany(cardId: number) {
        const card = await this.cardRepo.find({ where: { id: cardId } });
        if (!card) throw new NotFoundException();
        return (await this.commentRepo.find({ where: { cardId } })).map(
            (comment) => this.commentRepo.response(comment),
        );
    }

    async getOne(id: number) {
        const comment = await this.commentRepo.findOne({ where: { id } });
        if (!comment) throw new NotFoundException();
        return this.commentRepo.response(comment);
    }

    async createOne(req, dto: CreateCommentDTO, cardId: number) {
        const owner = await this.userRepo.findOne({
            where: { id: req.user.id },
        });
        const card = await this.cardRepo.findOne({
            where: { id: cardId },
        });
        if (!card) throw new NotFoundException();
        const comment = this.commentRepo.create({ ...dto, owner, card });
        await this.commentRepo.save(comment);
        return this.commentRepo.response(comment);
    }

    async updateOne(dto: UpdateCommentDTO, id: number) {
        await this.commentRepo.update({ id }, dto);
        const comment = await this.commentRepo.findOne({ where: { id } });
        return this.commentRepo.response(comment);
    }

    async deleteOne(id: number) {
        const comment = await this.commentRepo.findOne({ where: { id } });
        this.commentRepo.delete({ id });
        return this.commentRepo.response(comment);
    }
}
