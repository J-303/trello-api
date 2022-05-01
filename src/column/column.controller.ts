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
import { ColumnOwnerGuard } from './column-owner.guard';
import {
    CreateColumnDTO,
    ResponseColumnDTO,
    UpdateColumnDTO,
} from './column.dto';
import { ColumnService } from './column.service';

@ApiTags('Columns')
@ApiBearerAuth()
@Controller()
export class ColumnController {
    constructor(private columnService: ColumnService) {}

    @ApiOkResponse({ type: ResponseColumnDTO })
    @ApiNotFoundResponse()
    @Get('users/:ownerId/columns')
    getManyColumns(@Param('ownerId') ownerId: number) {
        return this.columnService.getMany(ownerId);
    }

    @ApiOkResponse({ type: ResponseColumnDTO })
    @ApiNotFoundResponse()
    @Get('columns/:id')
    getOneColumn(@Param('id') id: number) {
        return this.columnService.getOne(id);
    }

    @ApiOkResponse({ type: ResponseColumnDTO })
    @ApiUnauthorizedResponse()
    @UseGuards(AuthGuard())
    @Post('columns')
    createOneColumn(@Request() req, @Body() dto: CreateColumnDTO) {
        return this.columnService.createOne(req, dto);
    }

    @ApiOkResponse({ type: ResponseColumnDTO })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @UseGuards(AuthGuard(), ColumnOwnerGuard)
    @Put('columns/:id')
    updateOneColumn(@Param('id') id: number, @Body() dto: UpdateColumnDTO) {
        return this.columnService.updateOne(dto, id);
    }

    @ApiOkResponse({ type: ResponseColumnDTO })
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @UseGuards(AuthGuard(), ColumnOwnerGuard)
    @Delete('columns/:id')
    deleteOneColumn(@Param('id') id: number) {
        return this.columnService.deleteOne(id);
    }
}
