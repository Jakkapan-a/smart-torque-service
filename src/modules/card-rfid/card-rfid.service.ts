import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRfid } from './entities/card-rfid.entity';
import { Repository } from 'typeorm';
import { CardPlayLoadRfidDto } from './dto/card-rfid.dto';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
import { error } from 'console';

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
        return await paginate<CardRfid>(this.cardRfidRepository, options, {order: {id: 'DESC'}});
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
        cardRfid.is_activate = cardRfidDto.is_activate;
        cardRfid.description = cardRfidDto.description;
        return this.cardRfidRepository.save(cardRfid);
    }

    async findOne(id: number) {
        const cardRfid = await this.cardRfidRepository.findOne({where: {id}});
        if(!cardRfid) {
            throw new UnprocessableEntityException('Card RFID not found');
        }
        return cardRfid;
    }

    async update(id: number, cardPlayLoadRfidDto: CardPlayLoadRfidDto) {
        this.validateCardPlayLoad(cardPlayLoadRfidDto);
        const cardRfid = await this.cardRfidRepository.findOne({where: {id}});
        if(!cardRfid) {
            throw new UnprocessableEntityException('Card RFID not found');
        }
        cardRfid.name = cardPlayLoadRfidDto.name;
        cardRfid.card_uid = cardPlayLoadRfidDto.card_uid;
        cardRfid.is_activate = cardPlayLoadRfidDto.is_activate;
        cardRfid.description = cardPlayLoadRfidDto.description;
        return this.cardRfidRepository.save(cardRfid);
    }

    async remove(id: number) {
        const cardRfid = await this.cardRfidRepository.findOne({where: {id}});
        if(!cardRfid) {
            throw new NotFoundException('Card RFID not found');
        }
        return await this.cardRfidRepository.remove(cardRfid);
    }

    async findByCardUid(card_uid: string) {
        return await this.cardRfidRepository.findOne({where: {card_uid}});
    }

    async findByCardUidAndIsActive(card_uid: string) {
        return await this.cardRfidRepository.findOne({where: {card_uid, is_activate: true}});
    }

    validateCardPlayLoad(cardPlayLoadRfidDto: CardPlayLoadRfidDto):boolean {
        // Validate data
        if (cardPlayLoadRfidDto.card_uid === undefined) {
            throw new UnprocessableEntityException('Card UID is required');
        }

        if (cardPlayLoadRfidDto.name === undefined) {
            throw new UnprocessableEntityException('Name is required');
        }

        if(cardPlayLoadRfidDto.is_activate === undefined) {
            throw new UnprocessableEntityException('Is Active is required');
        }

        if(cardPlayLoadRfidDto.description === undefined) {
            throw new UnprocessableEntityException('Description is required');
        }
        
        return true;
    }

    async verifyCard(card_uid: string): Promise<{cardRfid: CardRfid, status: boolean}>
    {   
        if(card_uid === undefined) {
            throw new NotFoundException('Card UID is required');
        }
        const cardRfid = await this.cardRfidRepository.findOne({where: {card_uid, is_activate: true}});
        if(!cardRfid) {
            throw new UnauthorizedException({message: 'Card not found or not active', card_uid, error: 'Unauthorized',statusCode: 401 });
        }
        return {cardRfid,status: true};
    }
}
