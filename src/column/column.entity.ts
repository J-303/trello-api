import { CardEntity } from 'src/card/card.entity';
import { UserEntity } from 'src/user/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('columns')
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => UserEntity)
    owner: UserEntity;

    @Column()
    ownerId: number;

    @OneToMany((type) => CardEntity, (card) => card.column, { cascade: true })
    cards?: CardEntity[];
}
