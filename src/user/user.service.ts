import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepo: UserRepository,
        private authService: AuthService,
    ) {}

    async login(req: any, dto: LoginUserDTO) {
        const user = await this.userRepo.findOne({
            where: { id: req.user.id },
        });
        return {
            access_token: await this.authService.createToken(user),
            user: this.userRepo.response(user),
        };
    }

    async register(dto: CreateUserDTO) {
        let user = await this.userRepo.findOne({ where: { email: dto.email } });
        if (user) throw new ForbiddenException();
        user = this.userRepo.create(dto);
        this.userRepo.save(user);
        return {
            access_token: await this.authService.createToken(user),
            user: this.userRepo.response(user),
        };
    }

    async getOne(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException();
        return this.userRepo.response(user);
    }

    async getMany() {
        const users = await this.userRepo.find();
        return users.map((user) => this.userRepo.response(user));
    }

    async updateOne(id: number, dto: UpdateUserDTO) {
        await this.userRepo.update({ id }, dto);
        const user = await this.userRepo.findOne({ where: { id } });
        return this.userRepo.response(user);
    }

    async deleteOne(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException();
        this.userRepo.delete({ id });
        return this.userRepo.response(user);
    }
}
