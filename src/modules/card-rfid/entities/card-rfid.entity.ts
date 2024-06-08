// src/modules/card-rfid/entities/card-rfid.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class CardRfid {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    card_id: string;

    @Column()
    card_uid: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: '' })
    description: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @CreateDateColumn({ type: 'datetime' })
    updated_at: Date;
}