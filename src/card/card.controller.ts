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
import { CardOwnerGuard } from './card-owner.guard';
import { CreateCardDTO, ResponseCardDTO, UpdateCardDTO } from './card.dto';
import { CardService } from './card.service';

@ApiTags('Cards')
@ApiBearerAuth()
@Controller()
export class CardController {
    constructor(private cardService: CardService) {}

    @ApiOkResponse({ type: ResponseCardDTO })
    @ApiNotFoundResponse()
    @Get('users/:ownerId/cards')
    getManyCards(@Param('ownerId') ownerId: number) {
        return this.cardService.getMany(ownerId);
    }

    @ApiOkResponse({ type: ResponseCardDTO })
    @ApiNotFoundResponse()
    @Get('cards/:id')
    getOneCard(@Param('id') id: number) {
        return this.cardService.getOne(id);
    }

    @ApiOkResponse({ type: ResponseCardDTO })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @UseGuards(AuthGuard())
    @Post('columns/:columnId/cards')
    createOneCard(
        @Request() req,
        @Body() dto: CreateCardDTO,
        @Param('columnId') columnId: number,
    ) {
        return this.cardService.createOne(req, dto, columnId);
    }

    @ApiOkResponse({ type: ResponseCardDTO })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @UseGuards(AuthGuard(), CardOwnerGuard)
    @Put('cards/:id')
    updateOneCard(@Param('id') id: number, @Body() dto: UpdateCardDTO) {
        return this.cardService.updateOne(dto, id);
    }

    @ApiOkResponse({ type: ResponseCardDTO })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @UseGuards(AuthGuard(), CardOwnerGuard)
    @Delete('cards/:id')
    deleteOneCard(@Param('id') id: number) {
        return this.cardService.deleteOne(id);
    }
}
