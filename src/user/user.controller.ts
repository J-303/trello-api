import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDTO, LoginUserDTO, ResponseUserDTO, UpdateUserDTO } from './user.dto';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth('Bearer token')
@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOkResponse({ type: ResponseUserDTO })
    @ApiUnauthorizedResponse()
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req, @Body() dto: LoginUserDTO) {
        return this.userService.login(req, dto);
    }

    @ApiOkResponse({ type: ResponseUserDTO })
    @ApiForbiddenResponse()
    @Post('auth/register')
    async register(@Body() dto: CreateUserDTO) {
        return await this.userService.register(dto);
    }

    @ApiOkResponse({ type: ResponseUserDTO })
    @Get('users')
    async getManyUsers() {
        return this.userService.getMany();
    }

    @ApiOkResponse({ type: ResponseUserDTO })
    @ApiNotFoundResponse()
    @Get('users/:id')
    async getOneUser(@Param('id') id: number) {
        return this.userService.getOne(id);
    }

    @ApiOkResponse({ type: ResponseUserDTO })
    @ApiNotFoundResponse()
    @ApiUnauthorizedResponse()
    @UseGuards(AuthGuard(), UserGuard)
    @Put('users/:id')
    async updateOneUser(@Param('id') id: number, @Body() data: UpdateUserDTO) {
        return this.userService.updateOne(id, data);
    }

    @ApiOkResponse({ type: ResponseUserDTO })
    @ApiNotFoundResponse()
    @ApiUnauthorizedResponse()
    @UseGuards(AuthGuard(), UserGuard)
    @Delete('users/:id')
    async deleteOneUser(@Param('id') id: number) {
        return this.userService.deleteOne(id);
    }
}
