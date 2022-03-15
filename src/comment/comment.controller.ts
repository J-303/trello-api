import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/share/auth.guard';
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
    @Get('comment/:id')
    getOneComment(@Param('id') id: number) {
        return this.commentServise.getOne(id);
    }
    
    @ApiCreatedResponse({description: 'Comment created'})
    @ApiForbiddenResponse({description: 'Cannot create comment'})
    @Post('card/:cardid')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createComment(@Param('cardid') cardId: number, @User('id') userId: number, @Body() data: CommentDTO) {
        return this.commentServise.create(cardId, userId, data);
    }

    @ApiAcceptedResponse({description: 'Comment edited'})
    @ApiForbiddenResponse({description: 'Cannot edit comment'})
    @ApiNotFoundResponse({description: 'Comment not found'})
    @Put('comment/:id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    editComment(@Param('id') id: number, @User('id') ownerId: number, @Body() data: CommentDTO) {
        return this.commentServise.update(id, ownerId, data);
    }

    @ApiAcceptedResponse({description: 'Comment deleted'})
    @ApiForbiddenResponse({description: 'Cannot delete comment'})
    @ApiNotFoundResponse({description: 'Comment not found'})
    @Delete('comment/:id') 
    @UseGuards(new AuthGuard())
    removeComment(@Param('id') id: number, @User('id') ownerId: number) {
        return this.commentServise.delete(id, ownerId);
    }
}
