import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './user.decorator';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UserController {
    constructor(
        private userServise: UserService
    ) {}

    @ApiAcceptedResponse({description: 'User logged in successfully'})
    @ApiBadRequestResponse({description: 'Cannot log in'})
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Body() data: UserDTO) {
        return this.userServise.login(data);
    }

    @ApiCreatedResponse({description: 'User created'})
    @ApiBadRequestResponse({description: 'Cannot create user'})
    @Post('register')
    register(@Body() data: UserDTO) {
        return this.userServise.register(data);
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    @Get('users')
    getAllUsers() {
        return this.userServise.getAll();
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiNotFoundResponse({description: 'User not found'})
    @Get('users/:id')
    getOneUser(@Param('id') id: number) {
        return this.userServise.getOne(id);
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiForbiddenResponse({description: 'Cannot get user info'})
    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getMe(@User('id') userId: number) {
        return this.userServise.getOne(userId);
    }
    
    @ApiAcceptedResponse({description: 'User info changed'})
    @ApiForbiddenResponse({description: 'Cannot change user info'})
    @ApiNotFoundResponse({description: 'User not found'})
    @Put('users')
    @UseGuards(AuthGuard('jwt'))
    editUser(@User('id') id: number, @Body() data: UserDTO) {
        return this.userServise.edit(id, data);
    }

    @ApiAcceptedResponse({description: 'Password changed'})
    @ApiForbiddenResponse({description: 'Cannot change password'})
    @ApiNotFoundResponse({description: 'User not found'})
    @Put('changepassword')
    @UseGuards(AuthGuard('jwt'))
    changePassword(@User('id') userId: number, @Body() data: UserDTO) {
        return this.userServise.changePass(userId, data);
    }
}