import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login_auth')
export class LoginAuth {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nroDocument: string;

    @Column()
    password: string;

    @Column()
    documentType: string;

    @Column()
    idUsuario: number;

    isActive: boolean;
}