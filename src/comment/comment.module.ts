import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/card.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
    imports:[TypeOrmModule.forFeature([CommentEntity, UserEntity, CardEntity])],
    controllers:[CommentController],
    providers:[CommentService]
})
export class CommentModule {}

