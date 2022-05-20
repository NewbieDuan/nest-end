import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    name: string;

    @Column({ length: 20 })
    type: string;

    @Column('int')
    size: number

    @Column({ length: 50 })
    desc: string;

    @Column({ length: 200 })
    addr: string

    @Column({ length: 100 })
    originalname: string

    @Column('bigint')
    createTime: number

    @ManyToOne(() => User, (user) => user.files)
    user: User
}