// src/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cv } from './cv.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' }) // Default role is 'user'
  role: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];
}
