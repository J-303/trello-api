import { ColumnEntity } from 'src/column/column.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { UserEntity } from 'src/user/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cards')
export class CardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    content?: string;

    @ManyToOne((type) => UserEntity, (user) => user.cards)
    owner: UserEntity;

    @Column()
    ownerId: number;

    @ManyToOne((type) => ColumnEntity)
    column: ColumnEntity;

    @Column()
    columnId: number;

    @OneToMany((type) => CommentEntity, (comment) => comment.card, { cascade: true })
    comments?: CommentEntity[];
}
