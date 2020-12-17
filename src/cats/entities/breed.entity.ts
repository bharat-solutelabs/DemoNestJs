import { PrimaryGeneratedColumn, Column, ManyToMany, Entity } from "typeorm";
import { cat } from "./cat.entity";

@Entity()
export class breed {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@ManyToMany(
    type => cat,
    cat => cat.breed
)
cat: cat[]
}
