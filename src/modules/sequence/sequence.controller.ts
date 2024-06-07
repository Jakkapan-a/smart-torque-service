import { Controller, Get, Param, Post,Body, Render, UseGuards } from '@nestjs/common';
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
}