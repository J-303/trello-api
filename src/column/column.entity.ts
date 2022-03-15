import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { CardEntity } from "src/card/card.entity";

@Entity('column')
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)
    @JoinColumn({name:'user'})
    owner: UserEntity;

    @OneToMany(type => CardEntity, card => card.column, {cascade: true})
    cards?: CardEntity[];

    response() {
        const {id, name} = this;
        const respongeObj = {
            id,
            name, 
            owner: {
                id: this.owner.id, 
                username: this.owner.username
            }, 
            cards: this.cards?.map(card => {return {
                id: card.id, 
                name: card.name
            }})
        }
        return respongeObj;
    }
}