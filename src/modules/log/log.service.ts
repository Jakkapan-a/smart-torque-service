import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
    constructor(@InjectRepository(Log) private logRepository: Repository<Log>) {}

    async createLog(item_no: number, message: string) {
        const log = new Log();
        log.item_no = item_no;
        log.message = message;
        await this.logRepository.save(log);
    }

    async getLogs() {
        return await this.logRepository.find();
    }

    async getLogByItemNo(item_no: number) {
        return await this.logRepository.find({ where: { item_no: item_no } });
    }

    async updateLogByItemNo(item_no: number, message: string) {
        const log = await this.logRepository.findOne({ where: { item_no: item_no } });
        log.message = message;
        await this.logRepository.save(log);
    }

    async deleteLogByItemNo(item_no: number) {
        await this.logRepository.delete({ item_no: item_no });
    }
    
    async deleteLog(id: number) {
        await this.logRepository.delete(id);
    }
}
