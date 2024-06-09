import { Body, Controller, DefaultValuePipe, Get, Post, Query, Render } from '@nestjs/common';
import { CardRfidService } from './card-rfid.service';
import { CardPlayLoadRfidDto } from './dto/card-rfid.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CardRfid } from './entities/card-rfid.entity';

@Controller('card-rfid')
export class CardRfidController {
    constructor(private readonly cardRfidService: CardRfidService) {}

    @Get()
    @Render('pages/card-rfid/index')
    root() {
        return { title: 'Card RFID', message: 'Welcome to the Card RFID Page' };
    }

    @Get('get-all')
    async getAll(@Query('page', new DefaultValuePipe(1)) page: number, @Query('limit', new DefaultValuePipe(10)) limit: number): Promise<Pagination<CardRfid>>
    {
        // const start = body.start || 0;
        // const limit = body.limit || 10;
        // return await this.cardRfidService.findAll(start, limit);
        const route = '/card-rfid/get-all';
        return await this.cardRfidService.findAllPaginate({ page, limit , route});
    }

    @Post()
    async create(@Body() cardRfidDto:CardPlayLoadRfidDto) {
        return await this.cardRfidService.create(cardRfidDto);
    }
}
