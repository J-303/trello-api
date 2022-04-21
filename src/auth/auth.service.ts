import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userRepo.findOne({where: {username}});
        if (user && compare(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
