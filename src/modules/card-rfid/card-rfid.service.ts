import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRfid } from './entities/card-rfid.entity';
import { Repository } from 'typeorm';
import { CardPlayLoadRfidDto } from './dto/card-rfid.dto';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';

@Injectable()
export class CardRfidService {
    constructor(@InjectRepository(CardRfid) private cardRfidRepository: Repository<CardRfid>) {}


    async findAll(start: number, limit: number) {
        const cardRfids = await this.cardRfidRepository.find({
            skip: start,
            take: limit
        });

        const total = await this.cardRfidRepository.count();
        const provide = total - start;
        const next = provide > limit ? limit : provide;
        return {
            data: cardRfids,
            page:{
                total: total,
                next: next,
                start: start,
                limit: limit,
                provide: provide
            }
        }
    }

    async findAllPaginate(options: IPaginationOptions): Promise<Pagination<CardRfid>> {
        return paginate<CardRfid>(this.cardRfidRepository, options);
    }

     async create(cardRfidDto: CardPlayLoadRfidDto) {
        this.validateCardPlayLoad(cardRfidDto);
        // validate card uid
        const cardRfidExist = await this.cardRfidRepository.findOne({where: {card_uid: cardRfidDto.card_uid}});
        if(cardRfidExist) {
            throw new UnprocessableEntityException('Card UID already exist');
        }
        const cardRfid = new CardRfid();
        cardRfid.name = cardRfidDto.name;
        cardRfid.card_uid = cardRfidDto.card_uid;
        cardRfid.is_active = cardRfidDto.is_active;
        cardRfid.description = cardRfidDto.description;
        return this.cardRfidRepository.save(cardRfid);
    }

    async findOne(id: number) {
        return await this.cardRfidRepository.findOne({where: {id}});
    }

    async update(id: number, cardPlayLoadRfidDto: CardPlayLoadRfidDto) {
        const cardRfid = await this.cardRfidRepository.findOne({where: {id}});
        cardRfid.name = cardPlayLoadRfidDto.name;
        cardRfid.card_uid = cardPlayLoadRfidDto.card_uid;
        cardRfid.is_active = cardPlayLoadRfidDto.is_active;
        cardRfid.description = cardPlayLoadRfidDto.description;
        return this.cardRfidRepository.save(cardRfid);
    }

    async remove(id: number) {
        const cardRfid = await this.cardRfidRepository.findOne({where: {id}});
        return this.cardRfidRepository.remove(cardRfid);
    }

    async findByCardUid(card_uid: string) {
        return await this.cardRfidRepository.findOne({where: {card_uid}});
    }

    async findByCardUidAndIsActive(card_uid: string) {
        return await this.cardRfidRepository.findOne({where: {card_uid, is_active: true}});
    }

    validateCardPlayLoad(cardPlayLoadRfidDto: CardPlayLoadRfidDto):boolean {
        // Validate data
        if (cardPlayLoadRfidDto.card_uid === undefined) {
            throw new UnprocessableEntityException('Card UID is required');
        }

        if (cardPlayLoadRfidDto.name === undefined) {
            throw new UnprocessableEntityException('Name is required');
        }

        if(cardPlayLoadRfidDto.is_active === undefined) {
            throw new UnprocessableEntityException('Is Active is required');
        }

        if(cardPlayLoadRfidDto.description === undefined) {
            throw new UnprocessableEntityException('Description is required');
        }
        
        return true;
    }
}
