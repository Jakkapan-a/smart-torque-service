import { Controller, Get, Param, Post,Body, Render, UseGuards, Put, UnprocessableEntityException, Delete } from '@nestjs/common';
import { SequenceService } from './sequence.service';
import { Sequence } from './entities/sequence.entity';
import { SequenceDto } from './dto/sequence.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';


@Controller('model/:model_id')
export class SequenceController {
    constructor(private readonly sequenceService: SequenceService) 
    {
        console.log('SequenceController loaded');
    }

    @Get('sequence')
    @Render('pages/sequence/index')
    getSequence(@Param('model_id') model_id: number) {
        return { title: 'Sequence', message: 'Welcome to the Sequence Page', model_id: model_id };
    }
    
    @UseGuards(JwtGuard)
    @Post('sequence')
    async postSequence(@Param('model_id') model_id: number,@Body() sequenceDto:SequenceDto): Promise<Sequence> {
        return await this.sequenceService.create(model_id, sequenceDto);
    }
    
    @UseGuards(JwtGuard)
    @Put('sequence/:sequence_id/update')
    async updateSequence(@Param('model_id') model_id: number,@Param('sequence_id') sequence_id: number,@Body() sequenceDto:SequenceDto): Promise<Sequence> {
        return await this.sequenceService.update(model_id, sequence_id, sequenceDto);
    }

    @UseGuards(JwtGuard)
    @Get('sequence/:sequence_id/show')
    async showSequence(@Param('sequence_id') sequence_id: number): Promise<Sequence> {
        const data = await this.sequenceService.findOne(sequence_id);
        if(data == null) {
            throw new UnprocessableEntityException('Sequence not found');
        }
        return data;
    }

    @UseGuards(JwtGuard)
    @Delete('sequence/:sequence_id/delete')
    async deleteSequence(@Param('sequence_id') sequence_id: number): Promise<Sequence> {
        return await this.sequenceService.remove(sequence_id);
    }

    @Get('get-sequences')
    async getSequenceData(@Param('model_id') model_id: number): Promise<Sequence[]> {
        return await this.sequenceService.findAll(model_id);
    }

}