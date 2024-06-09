// // src/modules/sequence/entities/sequence.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Sequence {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    model_id: number;

    @Column()
    name: string;

    @Column()
    min: number;

    @Column()
    max: number;

    @Column({ default: 0, nullable: true})
    increment: number;

    @Column()
    is_activate: boolean;

    @Column()
    scw_count: number;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @CreateDateColumn({ type: 'datetime' })
    updated_at: Date;
}
