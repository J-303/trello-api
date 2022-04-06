import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/share/auth.guard';
import { User } from './user.decorator';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller()
export class UserController {
    constructor(
        private userServise: UserService
    ) {}

    @ApiAcceptedResponse({description: 'User logged in successfully'})
    @ApiBadRequestResponse({description: 'Cannot log in'})
     //TODO: лучше так и назвать endpoint /login
    @Get('auth')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDTO) {
        return this.userServise.login(data);
    }

    @ApiCreatedResponse({description: 'User created'})
    @ApiBadRequestResponse({description: 'Cannot create user'})
    //TODO: лучше так и назвать endpoint /register
    @Post('auth')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDTO) {
        return this.userServise.register(data);
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    //TODO: Нет, так не делается пагинация. Давай пока её лучше уберем
    @Get('users/:page')
    getAllUsers(@Param('page') page: number) {
        return this.userServise.getAll(page);
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    @Get('users')
    getAllUsersPage1() {
        return this.userServise.getAll(1);
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiNotFoundResponse({description: 'User not found'})
    //TODO: должно быть users/:id
    @Get('user/:id')
    getOneUser(@Param('id') id: number) {
        return this.userServise.getOne(id);
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiForbiddenResponse({description: 'Cannot get user info'})
    @Get('user')
    @UseGuards(new AuthGuard())
    getMe(@User('id') userId: number) {
        return this.userServise.getOne(userId);
    }
    
    @ApiAcceptedResponse({description: 'User info changed'})
    @ApiForbiddenResponse({description: 'Cannot change user info'})
    @ApiNotFoundResponse({description: 'User not found'})
    @Put('user')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    editUser(@User('id') id: number, @Body() data: UserDTO) {
        return this.userServise.edit(id, data);
    }

    @ApiAcceptedResponse({description: 'Password changed'})
    @ApiForbiddenResponse({description: 'Cannot change password'})
    @ApiNotFoundResponse({description: 'User not found'})
    @Put('changepassword')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    changePassword(@User('id') userId: number, @Body() data: UserDTO) {
        return this.userServise.changePass(userId, data);
    }
}