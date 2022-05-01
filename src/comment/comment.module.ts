import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRepository } from 'src/card/card.repository';
import { UserRepository } from 'src/user/user.repository';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentRepository,
            CardRepository,
            UserRepository,
        ]),
        AuthModule
    ],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}
