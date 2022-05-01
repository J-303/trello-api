import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userRepo: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        const { id } = payload;
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new UnauthorizedException();
        done(null, user);
    }
}