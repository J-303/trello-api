import { CardEntity } from "src/card/card.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(type => UserEntity)
    @JoinColumn({name:'user'})
    owner: UserEntity;

    @ManyToOne(type => CardEntity)
    @JoinColumn({name:'card'})
    card: CardEntity;

    response() {
        return {
            ...this,
            owner: {id: this.owner.id, username: this.owner.username},
            card: {id: this.card.id, name: this.card.name}
        }
    }
}
