import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, Post, Put, Query, Render, UseGuards } from '@nestjs/common';
import { CardRfidService } from './card-rfid.service';
import { CardPlayLoadRfidDto } from './dto/card-rfid.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CardRfid } from './entities/card-rfid.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('card-rfid')
export class CardRfidController {
    constructor(private readonly cardRfidService: CardRfidService) {}

    @Get()
    @Render('pages/card-rfid/index')
    root() {
        return { title: 'Card RFID', message: 'Welcome to the Card RFID Page' };
    }
    @UseGuards(JwtGuard)
    @Get('get-all')
    async getAll(@Query('page', new DefaultValuePipe(1)) page: number, @Query('limit', new DefaultValuePipe(10)) limit: number): Promise<Pagination<CardRfid>>
    {
        const route = '/card-rfid/get-all';
        return await this.cardRfidService.findAllPaginate({ page, limit , route});
    }

    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() cardRfidDto:CardPlayLoadRfidDto) {
        return await this.cardRfidService.create(cardRfidDto);
    }

    @UseGuards(JwtGuard)
    @Get(':id/show')
    async show(@Param('id') id: number) {
        return await this.cardRfidService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Put(':id/update')
    async update(@Param('id') id: number, @Body() cardRfidDto:CardPlayLoadRfidDto) {
        return await this.cardRfidService.update(id, cardRfidDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id/delete')
    @HttpCode(204)
    async delete(@Param('id') id: number) {
        return await this.cardRfidService.remove(id);
    }

    @Get('verify-card')
    @HttpCode(200)
    async verifyCard(@Body('card_uid') card_uid: string): Promise<{cardRfid: CardRfid, status: boolean}> {
        return await this.cardRfidService.verifyCard(card_uid);
    }
}
