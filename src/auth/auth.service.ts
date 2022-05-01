import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRepo: UserRepository,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user || !compare(password, user.password))
            throw new UnauthorizedException();
        return user;
    }

    async createToken(user: UserEntity) {
        const payload = { id: user.id, email: user.email };
        return this.jwtService.sign(payload);
    }
}
