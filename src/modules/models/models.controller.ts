import { Controller, Get, Post } from '@nestjs/common';

@Controller('model')
export class ModelsController {
    constructor() {
        console.log('ModelsController');
    }

    @Get()
    findAll(): string {
        return 'This action returns all models';
    }
    @Post()
    create(): string {
        return 'This action adds a new model';
    }

    @Get(':id')
    findOne(): string {
        return 'This action returns a model';
    }
}
