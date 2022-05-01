import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnRepository } from 'src/column/column.repository';
import { UserRepository } from 'src/user/user.repository';
import { CardRepository } from './card.repository';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CardRepository,
            ColumnRepository,
            ColumnRepository,
            UserRepository,
        ]),
        AuthModule
    ],
    controllers: [CardController],
    providers: [CardService],
})
export class CardModule {}
