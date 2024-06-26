import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '../models/entities/model.entity';
import { Sequence } from '../sequence/entities/sequence.entity';
import { Process } from './entities/process.entity';

@Injectable()
export class ProcessService {
    constructor(@InjectRepository(Model) private modelRepository: Repository<Model>, 
    @InjectRepository(Sequence) private sequenceRepository: Repository<Sequence>, 
    @InjectRepository(Process) private processRepository: Repository<Process>) {}

    async getProcessInfo() {
        const model = await this.modelRepository.findOne({ where: { is_activate: true } });
        const sequence = await this.getSequenceInfo(model.id);
        const scw_count = sequence.reduce((acc, cur) => acc + cur.scw_count, 0);
        const modelInfo = {
            model: model,
            sequence: sequence,
            summary: {
                scw_count: scw_count
            }
        }
        return modelInfo;
    }

    async getSequenceInfo(model_id: number) {
        // get sequence by model_id
        const sequence = await this.sequenceRepository.find({ where: { model_id: model_id }, order: { id: 'ASC' } });
        return sequence;
    }

    async  getNewItem(): Promise<Process>
    {
        // item = yymmdd_hhmmss_(random 4 digit)
        // ex) 210831_030919_1234
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2);
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const item = `${year}${month}${day}${hours}${minutes}${seconds}${random}`;

        const model = await this.getProcessInfo();
        const process = new Process();
        process.model_id = model.model.id;
        process.item = parseInt(item);
        process.model = JSON.stringify(model.model);
        process.sequence = JSON.stringify(model.sequence);
        process.sum_scw_count = model.summary.scw_count;
        process.current_scw_count = 0;        
        console.log('new item:', model);
        const newProcess = await this.processRepository.save(process);
        return newProcess;
    }
}
