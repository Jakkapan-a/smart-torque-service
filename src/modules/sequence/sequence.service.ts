import { ForbiddenException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sequence } from './entities/sequence.entity';
import { Repository } from 'typeorm';
import { Model } from '../models/entities/model.entity';
import { SequenceDto } from './dto/sequence.dto';

@Injectable()
export class SequenceService {
    constructor(@InjectRepository(Model) private modelRepository: Repository<Model>,@InjectRepository(Sequence) private sequenceRepository: Repository<Sequence>) {}

    async create(model_id:number, sequenceDto:SequenceDto): Promise<Sequence> {
        const model = await this.modelRepository.countBy({ id: model_id })
        // console.log(model);
        if(model == 0) {
            throw new UnprocessableEntityException('Model not found');
        }  

        if(this.validateSequence(sequenceDto) == false) {
            throw new ForbiddenException('Name, min, max and scw_count are required');
        }
        const sequence = new Sequence();
        sequence.name = sequenceDto.name;
        sequence.description = sequenceDto.description;
        sequence.model_id = model_id;
        sequence.min = sequenceDto.min;
        sequence.max = sequenceDto.max;
        sequence.scw_count = sequenceDto.scw_count;
        sequence.is_active = false;
        sequence.created_at = new Date();
        sequence.updated_at = new Date();
        return await this.sequenceRepository.save(sequence);
    }

    validateSequence(sequenceDto:SequenceDto):boolean {
        if(sequenceDto.min == null || sequenceDto.max == null || sequenceDto.scw_count == null) {
            throw new ForbiddenException('Name, min, max and scw_count are required!');
        }
        if(sequenceDto.name == null) {
            throw new ForbiddenException('Name is required!');
        }

        if(sequenceDto.description == null) {
            sequenceDto.description = '';
        }
        return true;
    }

    async findAll(model_id:number): Promise<Sequence[]> {
        return await this.sequenceRepository.find({
            where: {model_id: model_id},
            order: {id: 'ASC'}
        })
    }

    async findOne(id: number): Promise<Sequence> {
        return await this.sequenceRepository.findOne({where: {id: id}});
    }

    async update(model_id:number, id: number, sequenceDto: SequenceDto): Promise<Sequence> {
        this.validateSequence(sequenceDto);

        const sequence = await this.sequenceRepository.findOne({where: {id: id}});
        if(sequence == null) {
            throw new UnprocessableEntityException('Sequence not found');
        }
        sequence.name = sequenceDto.name;
        sequence.description = sequenceDto.description;
        sequence.min = sequenceDto.min;
        sequence.max = sequenceDto.max;
        sequence.scw_count = sequenceDto.scw_count;
        sequence.updated_at = new Date();
        return await this.sequenceRepository.save(sequence);
    }

    async show(id: number): Promise<Sequence> {
        return await this.sequenceRepository.findOne({where: {id: id}});
    }

    async remove(id: number): Promise<Sequence> {
        const sequence = await this.sequenceRepository.findOne({where: {id: id}});
        if(sequence == null) {
            throw new UnprocessableEntityException('Sequence not found');
        }
        return await this.sequenceRepository.remove(sequence);
    }
}
