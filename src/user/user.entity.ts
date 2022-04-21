import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
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
}
