import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO, UserDTOResponse } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async login(data: UserDTO) {
        const user: UserDTOResponse = data;
        const payload = { username: data.email, password: data.password};
        return { access_token: this.jwtService.sign(payload), user };
    }

    async register(data: UserDTO) {
        const {email} = data;
        const userCheck = await this.userRepository.findOne({where: {email}})
        if (userCheck) {
            throw new HttpException(
                'Email is already in use.',
                HttpStatus.BAD_REQUEST
            );
        }
        const user = this.userRepository.create(data);
        this.userRepository.save(user);
        return this.login(user);
    }

    async getOne(id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        const userResponse: UserDTOResponse = user;
        return userResponse;
    }

    async getAll() {
        const users = await this.userRepository.find();
        if (!users) throw new HttpException('Users not found.', HttpStatus.NOT_FOUND);
        return users.map(user => {
            const userResponse: UserDTOResponse = user;
            return userResponse;
        });
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