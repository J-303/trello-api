import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { User } from 'src/user/user.decorator';
import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';

@Controller()
export class CommentController {
    constructor (
        private commentServise: CommentService
    ) {}
    
    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiNotFoundResponse({description: 'Comment not found'})
    @Get('comments/:id')
    getOneComment(@Param('id') id: number) {
        return this.commentServise.getOne(id);
    }
    
    @ApiCreatedResponse({description: 'Comment created'})
    @ApiForbiddenResponse({description: 'Cannot create comment'})
    @Post('cards/:cardid')
    @UseGuards(AuthGuard('jwt'))
    createComment(@Param('cardid') cardId: number, @User('id') userId: number, @Body() data: CommentDTO) {
        return this.commentServise.create(cardId, userId, data);
    }

    @ApiAcceptedResponse({description: 'Comment edited'})
    @ApiForbiddenResponse({description: 'Cannot edit comment'})
    @ApiNotFoundResponse({description: 'Comment not found'})
    @Put('comments/:id')
    @UseGuards(AuthGuard('jwt'))
    editComment(@Param('id') id: number, @User('id') ownerId: number, @Body() data: CommentDTO) {
        return this.commentServise.update(id, ownerId, data);
    }

    @ApiAcceptedResponse({description: 'Comment deleted'})
    @ApiForbiddenResponse({description: 'Cannot delete comment'})
    @ApiNotFoundResponse({description: 'Comment not found'})
    @Delete('comments/:id') 
    @UseGuards(AuthGuard('jwt'))
    removeComment(@Param('id') id: number, @User('id') ownerId: number) {
        return this.commentServise.delete(id, ownerId);
    }
}
