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
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CommentOwnerGuard } from './comment-owner.guard';
import {
    CreateCommentDTO,
    ResponseCommentDTO,
    UpdateCommentDTO,
} from './comment.dto';
import { CommentService } from './comment.service';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller()
export class CommentController {
    constructor(private commentService: CommentService) {}

    @ApiOkResponse({ type: ResponseCommentDTO })
    @ApiNotFoundResponse()
    @Get('cards/:cardId/comments')
    getManyComments(@Param('cardId') cardId: number) {
        return this.commentService.getMany(cardId);
    }

    @ApiOkResponse({ type: ResponseCommentDTO })
    @ApiNotFoundResponse()
    @Get('comments/:td')
    getOneComment(@Param('id') id: number) {
        return this.commentService.getOne(id);
    }

    @ApiOkResponse({ type: ResponseCommentDTO })
    @ApiNotFoundResponse()
    @ApiUnauthorizedResponse()
    @UseGuards(AuthGuard())
    @Post('cards/:cardId/comments')
    createOneComment(
        @Request() req,
        @Body() dto: CreateCommentDTO,
        @Param('cardId') cardId: number,
    ) {
        return this.commentService.createOne(req, dto, cardId);
    }

    @ApiOkResponse({ type: ResponseCommentDTO })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @UseGuards(AuthGuard(), CommentOwnerGuard)
    @Put('comments/:id')
    updateOneComment(@Param('id') id: number, @Body() dto: UpdateCommentDTO) {
        return this.commentService.updateOne(dto, id);
    }

    @ApiOkResponse({ type: ResponseCommentDTO })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @UseGuards(AuthGuard(), CommentOwnerGuard)
    @Delete('comments/:id')
    deleteOneComment(@Param('id') id: number) {
        return this.commentService.deleteOne(id);
    }
}
