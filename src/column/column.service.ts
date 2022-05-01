import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { CreateColumnDTO, UpdateColumnDTO } from './column.dto';
import { ColumnRepository } from './column.repository';

@Injectable()
export class ColumnService {
    constructor(
        private columnRepo: ColumnRepository,
        private userRepo: UserRepository,
    ) {}

    async getMany(ownerId: number) {
        const user = await this.userRepo.findOne({ where: { id: ownerId } });
        if (!user) throw new NotFoundException();
        return (await this.columnRepo.find({ where: { ownerId } })).map(
            (column) => this.columnRepo.response(column),
        );
    }

    async getOne(id: number) {
        const column = await this.columnRepo.findOne({ where: { id } });
        if (!column) throw new NotFoundException();
        return this.columnRepo.response(column);
    }

    async createOne(req, dto: CreateColumnDTO) {
        const owner = await this.userRepo.findOne({
            where: { id: req.user.id },
        });
        const column = this.columnRepo.create({ ...dto, owner });
        await this.columnRepo.save(column);
        return this.columnRepo.response(column);
    }

    async updateOne(dto: UpdateColumnDTO, id: number) {
        await this.columnRepo.update({ id }, dto);
        const column = await this.columnRepo.findOne({ where: { id } });
        return this.columnRepo.response(column);
    }

    async deleteOne(id: number) {
        const column = await this.columnRepo.findOne({ where: { id } });
        if (!column) throw new NotFoundException();
        this.columnRepo.delete({ id });
        return this.columnRepo.response(column);
    }
}
