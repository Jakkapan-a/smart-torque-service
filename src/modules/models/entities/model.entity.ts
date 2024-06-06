// src/models/entity/model.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Model {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // is_active is a boolean column that defaults to false
    @Column({ default: false })
    is_active: boolean;
    // SQLite
    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @CreateDateColumn({ type: 'datetime' })
    updated_at: Date;
}