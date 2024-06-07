import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ModelsService } from './models.service';
import { Model } from './entities/model.entity';
import { modelPayloadDto } from './dto/model.dto';

@Controller('model')
export class ModelsController {
    constructor(private readonly modelsService: ModelsService) {
        // console.log('ModelsController');
    }
    @UseGuards(JwtGuard)
    @Get()
    async findAll(): Promise<Model[]> {
        return await this.modelsService.findAll();
    }
    @Post()
    create(): string {
        return 'This action adds a new model';
    }
    @UseGuards(JwtGuard)
    @Get(':id/show')
    async findOne(@Param('id') id: number): Promise<Model | null> {
        return await this.modelsService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Put(':id/update')
    async update(@Param('id') id: number, @Body() modelPayloadDto:modelPayloadDto): Promise<Model> {;
        return await this.modelsService.update(id, modelPayloadDto);
    }

    @UseGuards(JwtGuard)
    @Put(':id/set-active')
    async setActive(@Param('id') id: number): Promise<Model> {
        return await this.modelsService.setActive(id);
    }
    
    
    @UseGuards(JwtGuard)
    @Get('default')
    async default(): Promise<any>{
        const models = await this.modelsService.default();
        return models;
    }
}
