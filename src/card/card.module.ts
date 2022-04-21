import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { UserEntity } from 'src/user/user.entity';
import { CardController } from './card.controller';
import { CardEntity } from './card.entity';
import { CardService } from './card.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity, UserEntity, ColumnEntity, CommentEntity])
  ],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule {}
