import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
        AuthModule,
        ColumnModule,
        CardModule,
        CommentModule,
    ],
})
export class AppModule {}
