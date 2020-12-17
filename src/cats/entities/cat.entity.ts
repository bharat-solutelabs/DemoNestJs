import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm";
import { breed } from "./breed.entity";

@Entity()
export class cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default : 0})
    recommendations: number 

    @JoinTable()
    @ManyToMany(
        type => breed,
        breed => breed.name,
        {
            cascade: true
        },
    )
    breed: breed[]
}