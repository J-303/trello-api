import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CardRepository } from 'src/card/card.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, CardRepository]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
