import { Body, Controller, Post } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
    constructor(private readonly logService: LogService) { }


    @Post()
    async createLog(@Body() body: any) {
        const { item_no, message } = body;
        await this.logService.createLog(item_no, message);
        return { item_no, message, 'status': 'Log created' };
    }
}
