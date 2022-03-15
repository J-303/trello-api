import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/share/auth.guard';
import { User } from 'src/user/user.decorator';
import { CardDTO } from './card.dto';
import { CardService } from './card.service';

@Controller()
export class CardController {
    constructor(
        private cardServise: CardService
    ) {}
    
    @ApiAcceptedResponse({description: 'Request accepted'})
    @Get('column/:columnid/cards')
    getCardsColumn(@Param('columnid') id: number) {
        return this.cardServise.getAll(id);
    }
    
    @ApiAcceptedResponse({description: 'Request accepted'})
    @ApiNotFoundResponse({description: 'Card not found'})
    @Get('card/:cardid')
    getCard(@Param('cardid') id: number) {
        return this.cardServise.getOne(id);
    }

    @ApiCreatedResponse({description: 'Card created'})
    @ApiForbiddenResponse({description: 'Cannot create card'})
    @Post('column/:columnid')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    addCard(@Param('columnid') columnId: number, @User('id') userId: number, @Body() data: CardDTO) {
        return this.cardServise.create(userId, columnId, data);
    }

    @ApiCreatedResponse({description: 'Card updated'})
    @ApiNotFoundResponse({description: 'Card not found'})
    @ApiForbiddenResponse({description: 'Cannot create card'})
    @Put('card/:cardid')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    editCard(@Param('cardid') cardId: number, @User('id') userId: number, @Body() data: CardDTO) {
        return this.cardServise.update(cardId, userId, data);
    }
    
    @ApiCreatedResponse({description: 'Card deleted'})
    @ApiNotFoundResponse({description: 'Card not found'})
    @ApiForbiddenResponse({description: 'Cannot delete card'})
    @Delete('card/:cardid')
    @UseGuards(new AuthGuard())
    removeCard(@Param('cardid') cardId: number, @User('id') userId: number) {
        return this.cardServise.delete(cardId, userId);
    }
}
