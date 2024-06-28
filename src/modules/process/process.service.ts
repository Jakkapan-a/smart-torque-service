import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '../models/entities/model.entity';
import { Sequence } from '../sequence/entities/sequence.entity';
import { Process } from './entities/process.entity';
import { History } from '../history/entities/history.entity';
import { ModelsService } from '../models/models.service';

@Injectable()
export class ProcessService {
    constructor(@InjectRepository(Model) private modelRepository: Repository<Model>, 
    @InjectRepository(Sequence) private sequenceRepository: Repository<Sequence>, 
    @InjectRepository(Process) private processRepository: Repository<Process>,
    @InjectRepository(History) private historyRepository: Repository<History>,
    private readonly modelsService:ModelsService) {}

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
        // console.log('new item:', model);
        const newProcess = await this.processRepository.save(process);
        return newProcess;
    }


    async updateProcessInfoByItemNo(item_no: number, body: any) {
        const process = await this.processRepository.findOne({ where: { item: item_no } });
        
        // console.log(body.item);
        if (process && body.item.process) 
        {
            const item = body.item;
            // process.process = body
            process.process = body.item.process;
            // update process
            await this.processRepository.update(process.id, process);

            const processInfo = JSON.parse(process.process);
            const model = JSON.parse(item.model);
            const sequence = JSON.parse(item.sequence);
            // increase
            const scw_count = processInfo.reduce((acc, cur) => acc + cur.increase, 0);
            // update process
            const lastProcess = processInfo[processInfo.length - 1];
            const sequenceGet = sequence.find((s) => s.name === lastProcess.name);
            const {min, max,id: sequence_id} = sequenceGet;
            const time_complete = lastProcess.time_diff;
            // judgement ok or ng
            let judgement = time_complete >= min && time_complete <= max ? 'OK' : 'NG';
            if(scw_count > item.sum_scw_count){
                judgement = 'NG';
            }
            // update process history
            const history = new History();
            history.model_id = process.model_id;
            history.model_name = model.name;
            history.sequence_id = sequenceGet.id;
            history.sequence_name = sequenceGet.name;
            history.item = process.item;
            history.min = min;
            history.max = max;
            history.scw = scw_count;
            history.scw_count = item.sum_scw_count;
            history.time_start = item.time_start;
            history.time_end = item.time_stop;
            history.time_complete = time_complete;
            history.judgement = judgement;
            await this.historyRepository.save(history);
            // console.table(history);

            // console.log('---------------------------------------')
            // 
        }else{
            throw new UnprocessableEntityException('Process not found');
        }
    }
}
