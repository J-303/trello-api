import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/share/auth.guard';
import { ValidationPipe } from 'src/share/validation.pipe';
import { User } from 'src/user/user.decorator';
import { ColumnDTO } from './column.dto';
import { ColumnService } from './column.service';

@Controller()
export class ColumnController {
    constructor(
        private columnServise: ColumnService
    ) {}
    
    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiNotFoundResponse({description: 'User not found'})
    //TODO: Должно быть users/:userid/columns
    @Get('user/:userid/columns')
    getUserColumns(@Param('userid') id: number) {
        return this.columnServise.getAll(id);
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiNotFoundResponse({description: 'Column not found'})
    //TODO: Должно быть columns/...
    @Get('column/:columnid')
    getOneColumn(@Param('columnid') id: number) {
        return this.columnServise.getOne(id);
    }

    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiNotFoundResponse({description: 'User not found'})
    @Get('columns')
    @UseGuards(new AuthGuard())
    getMyColumns(@User('id') id: number) {
        return this.columnServise.getAll(id);
    }

    @ApiCreatedResponse({description: 'Column created'})
    @ApiForbiddenResponse({description: 'Cannot create column'})
    @Post('columns')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    addColumn(@User('id') id: number, @Body() data: ColumnDTO) {
        return this.columnServise.create(id, data);
    }

    @ApiAcceptedResponse({description: 'Column edited'})
    @ApiForbiddenResponse({description: 'Cannot edit column'})
    @ApiNotFoundResponse({description: 'Column not found'})
    @Put('column/:columnid')
    //TODO: Должна быть валидация на то, что текущий пользователь имеет право на редактирование этой колонки
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    editColumn(@User('id') userId: number, @Param('columnid') id: number, @Body() data: ColumnDTO) {
        return this.columnServise.update(id, userId, data);
    }

    @ApiCreatedResponse({description: 'Column deleted'})
    @ApiNotFoundResponse({description: 'Column not found'})
    @ApiForbiddenResponse({description: 'Cannot delete column'})
    @Delete('column/:columnid') 
    @UseGuards(new AuthGuard())
    removeColumn(@User('id') userId: number, @Param('columnid') id: number) {
        return this.columnServise.detele(id, userId);
    }
}
