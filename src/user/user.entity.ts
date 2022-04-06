import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { CardEntity } from "src/card/card.entity";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => CardEntity, card => card.owner, {cascade: true})
    cards?: CardEntity[];

    @BeforeInsert()
    async hashPass() {
        this.password = await bcrypt.hash(this.password, 7);
    }

    async checkPass(password: string) {
        return await bcrypt.compare(password, this.password);
    }

    //TODO: файл entity должен содержать только структуру таблицы. И может содержать базовую логику. Токен точно не должен здесь генерироваться. 
    private get token() {
        const {id, username} = this;
        return jwt.sign(
            {id, username},
            '123'
        );
    }

    response(showToken: boolean = false) {
        if (showToken) {
            return {
                id: this.id, 
                username: this.username,
                cards: this.cards?.map(card => {
                    return {
                        id: card.id, 
                        name: card.name
                    }
                }),
                token: this.token
            }
        } else {
            return {
                id: this.id, 
                username: this.username,
                cards: this.cards?.map(card => {
                    return {
                        id: card.id, 
                        name: card.name
                    }
                })
            }
        }
    }
}
