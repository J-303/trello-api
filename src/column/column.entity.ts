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
}