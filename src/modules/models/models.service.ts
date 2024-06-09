import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Repository } from 'typeorm';
import { modelPayloadDto } from './dto/model.dto';

@Injectable()
export class ModelsService {
    constructor(@InjectRepository(Model) private modelRepository: Repository<Model>) {
    }

    findAll(): Promise<Model[]> {
        return this.modelRepository.find();
    }

    async findOne(id: number): Promise<Model | null> {
        return await this.modelRepository.findOneBy({ id });
    }

    async create(model: Model): Promise<Model> {
        return this.modelRepository.save(model);
    }

    async update(id: number, modelPayloadDto: modelPayloadDto): Promise<Model> {
        // Validate if data exists
        if(!modelPayloadDto.name || !modelPayloadDto.description) {
            throw new UnprocessableEntityException('Name and description are required');
        }
        const model = await this.modelRepository.findOneBy({ id });
        if (!model) {
            throw new UnauthorizedException('Model not found');
        }
        // Update the model
        model.name = modelPayloadDto.name;
        model.description = modelPayloadDto.description;
        model.updated_at = new Date();
        await this.modelRepository.update(id, model);
        // Get the updated model
        return this.modelRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.modelRepository.delete(id);
    }

    async setActive(id: number): Promise<Model> {
        return this.modelRepository.manager.transaction(async (entityManager) => {
            await entityManager.update(Model, { is_activate: true }, { is_activate: false });
            // console.log(`Activating model with id: ${id}`);
            await entityManager.update(Model, { id }, { is_activate: true , updated_at: new Date() });
            const activatedModel = await entityManager.findOne(Model, { where: { id } });
            // console.log('Activated model:', activatedModel);
            return activatedModel;
        });
    }

    async default(): Promise<Model[]> {
        for (let i = 1; i <= 10; i++) {
            // Check if the model exists
            await this.modelRepository.findOneBy({ id: i }).then((model) => {
                if (!model) {
                    this.modelRepository.save({
                        id: i,
                        name: `M00${i}`,
                        description: `Description ${i}`,
                        is_activate: i === 1 ? true : false
                    });
                }
            });
        }

        return this.modelRepository.find();
    }
}
