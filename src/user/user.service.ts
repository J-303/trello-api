import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async login(data: UserDTO) {
        const {email, password} = data;
        let userCheck = await this.userRepository.findOne({where: {email}});
        if (!userCheck || !(await userCheck.checkPass(password))) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST
            );
        }
        return userCheck.response(true);
    }

    async register(data: UserDTO) {
        const {email} = data;
        let userCheck = await this.userRepository.findOne({where: {email}})
        if (userCheck) {
            throw new HttpException(
                'Email is already in use.',
                HttpStatus.BAD_REQUEST
            );
        }
        let user = this.userRepository.create(data);
        this.userRepository.save(user);
        return user.response(true);
    }

    async getOne(id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        return user.response();
    }

    async getAll(page: number = 1) {
        const users = await this.userRepository.find({
            take: 30,
            skip: (page-1)*30
        });
        if (!users) throw new HttpException('Users not found.', HttpStatus.NOT_FOUND);
        return users.map(user => user.response());
    }

    async edit(id: number, data: Partial<UserDTO>) {
        let user = await this.userRepository.findOne({where: {id}});
        if (!user) {
            throw new HttpException(
                'User not found.', 
                HttpStatus.NOT_FOUND
            );
        }
        let {email} = data;
        let emailCheck = await this.userRepository.findOne({where: {email}});
        if (emailCheck && emailCheck.id !== id) {
            throw new HttpException(
                'Email is already in use.',
                HttpStatus.BAD_REQUEST
            );
        }
        await this.userRepository.update({id}, data);
    }

    async changePass(userId: number, data: UserDTO) {
        let {email, password, newPass} = data;
        let user = await this.userRepository.findOne({where: {id: userId}});
        if (!user || !(await user.checkPass(password))) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST
            );
        }
        let newPwd = await bcrypt.hash(newPass, 7);
        await this.userRepository.update({email}, {password: newPwd});
    }
}