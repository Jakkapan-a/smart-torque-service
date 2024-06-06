import { Controller, Get } from '@nestjs/common';

@Controller('models')
export class ModelsController {
    constructor() {
        console.log('ModelsController');
    }

    @Get()
    findAll(): string {
        return 'This action returns all models';
    }
}
