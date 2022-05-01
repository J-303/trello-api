import { plainToClass } from 'class-transformer';
import { EntityRepository, Repository } from 'typeorm';
import { ResponseUserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    response(user: UserEntity): ResponseUserDTO {
        const result: ResponseUserDTO = plainToClass(ResponseUserDTO, user, {
            excludeExtraneousValues: true,
        });
        return result;
    }
}
