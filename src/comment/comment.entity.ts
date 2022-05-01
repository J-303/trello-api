import { CardEntity } from 'src/card/card.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne((type) => CardEntity, card => card.comments)
    card: CardEntity;

    @Column()
    cardId: number;

    @ManyToOne((type) => UserEntity)
    owner: UserEntity;

    @Column()
    ownerId: number;
}
