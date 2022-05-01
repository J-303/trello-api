import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' })

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1h' },
        }),
        passportModule
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, passportModule],
})
export class AuthModule {}
