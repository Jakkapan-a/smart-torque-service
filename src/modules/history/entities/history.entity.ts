import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model_id: number;

    @Column()
    model_name: string;

    @Column()
    item: number;
    
    @Column()
    sequence_id: number;

    @Column()
    sequence_name: string;
    
    @Column()
    scw: number;

    @Column()
    scw_count: number;

    @Column()
    time_start: number;

    @Column()
    time_end: number;

    @Column()
    time_complete: number;

    @Column()
    min: number;

    @Column()
    max: number;

    @Column()
    judgement: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}