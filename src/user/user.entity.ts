import { hash } from 'bcrypt';
import { CardEntity } from 'src/card/card.entity';
import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany((type) => CardEntity, (card) => card.owner, { cascade: true })
    cards?: CardEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}
