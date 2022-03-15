import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ColumnDTO } from './column.dto';
import { ColumnEntity } from './column.entity';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity)
        private columnRepository: Repository<ColumnEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    checkOwner(column: ColumnEntity, userId: number) {
        if (column.owner.id != userId)
            throw new HttpException(
                'Incorrect user.',
                HttpStatus.UNAUTHORIZED
            );
    }

    async getOne(id: number) {
        const column = await this.columnRepository.findOne({
            where:{id},
            relations: ['owner']
        });
        if (!column)
            throw new HttpException(
                'Column not found.',
                HttpStatus.NOT_FOUND
            );
        return column.response();
    }

    async getAll(userId: number) {
        const user = await this.userRepository.findOne({where:{id:userId}});
        if (!user) throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
        const columns = await this.columnRepository.find({
            where:{owner: userId},
            relations: ['owner']
        });
        return columns.map(column => column.response());
    }

    async create(ownerId: number, data: ColumnDTO) {
        const user = await this.userRepository.findOne({where:{id: ownerId}})
        if (!user)
            throw new HttpException(
                'Incorrect user.',
                HttpStatus.UNAUTHORIZED
            )
        const column = await this.columnRepository.create({
            ...data,
            owner: user
        });
        this.columnRepository.save(column);
        return column.response();
    }

    async update(id: number, ownerId: number, data: ColumnDTO) {
        let column = await this.columnRepository.findOne({
            where: {id},
            relations: ['owner']
        });
        if (!column)
            throw new HttpException(
                'Column not found.',
                HttpStatus.NOT_FOUND
            );
        this.checkOwner(column, ownerId);
        await this.columnRepository.update({id}, data);
        column = await this.columnRepository.findOne({
            where: {id},
            relations: ['owner']
        });
        return column.response();
    }

    async detele(id: number, ownerId: number) {
        const column = await this.columnRepository.findOne({
            where: {id},
            relations: ['owner']
        });
        if (!column)
            throw new HttpException(
                'Column not found.',
                HttpStatus.NOT_FOUND
            );
        this.checkOwner(column, ownerId);
        await this.columnRepository.remove(column);
        return column.response();
    }
}
