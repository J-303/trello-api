import { HttpException, HttpStatus } from "@nestjs/common";
import { ColumnEntity } from "src/column/column.entity";
import { CommentEntity } from "src/comment/comment.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('card')
export class CardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    content?: string;

    @ManyToOne(type => UserEntity)
    @JoinColumn({name:'user'})
    owner: UserEntity;

    @ManyToOne(type => ColumnEntity)
    @JoinColumn({name:'column'})
    column: ColumnEntity;

    @OneToMany(type => CommentEntity, comment => comment.card, {cascade: true})
    comments?: CommentEntity[];

    checkOwner(userId: number) {
        if(this.owner.id != userId)
            throw new HttpException('Incorrect user.', HttpStatus.UNAUTHORIZED);
    }
}
