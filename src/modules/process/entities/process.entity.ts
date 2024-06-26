import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Process {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model_id: number;

    @Column()
    item: number;

    // This is a JSON column
    @Column('text', { nullable: true })
    model: string;

    @Column('text', { nullable: true })
    sequence: string;

    @Column('text', { nullable: true })
    process: string;

    @Column('text', { nullable: true })
    logs: string;

    @Column()
    sum_scw_count: number;

    @Column()
    current_scw_count: number;
    
    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}