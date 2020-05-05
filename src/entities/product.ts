import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";
import { CustomBaseEntity } from "./custome-baseentity";

@Entity()
export class Product extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column("text")
    public name!: string;
    
    @Column("int")
    public price!: number;

    @Column("int")
    public quantity!: number;

}
