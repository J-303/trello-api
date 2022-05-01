import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRepository } from 'src/card/card.repository';
import { UserRepository } from 'src/user/user.repository';
import { ColumnRepository } from './column.repository';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ColumnRepository,
            CardRepository,
            UserRepository,
        ]),
        AuthModule
    ],
    controllers: [ColumnController],
    providers: [ColumnService],
})
export class ColumnModule {}
