import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ProcessService } from './process.service';
import { SequenceService } from '../sequence/sequence.service';

@Controller('process')
export class ProcessController {
    
    constructor(private readonly processService: ProcessService) { }

    @Get('/start')
    startProcess() {
        return 'Process started';
    }

    @Get('/stop')
    stopProcess() {
        return 'Process stopped';
    }

    @Get('/restart')
    restartProcess() {
        return 'Process restarted';
    }

    @Get('/info')
    async getProcessInfo() {
        const model = await this.processService.getProcessInfo();
        return model;
    }

    @Get('/new-item')
    async getNewItem() {
        const newItem = await this.processService.getNewItem();
        return { item: newItem };
    }

    @Get('/:item_no')
    async getProcessInfoByItemNo(item_no: string) {
        console.log(item_no);

        return 'Process info by item_no';
    }

    @Put('/:item_no/update')
    async updateProcessInfoByItemNo(@Param('item_no') item_no: number,@Body() body: any) {
        // console.log(item_no, body);

       await this.processService.updateProcessInfoByItemNo(item_no, body);

        return { item_no, 'message': 'Process info updated' };
    }
}
