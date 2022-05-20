import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { File } from "./file.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    username: string;

    @Column({ length: 20 })
    password: string;

    @Column({ length: 50 })
    email: string

    @Column({ default: false })
    is_admin: boolean

    @OneToMany(() => File, (file) => file.user)
    files: File[]
}