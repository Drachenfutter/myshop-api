import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn({length: 32, unique: true})
  id!: string;

  @Column({length: 100})
  name!: string;

  @PrimaryColumn({length: 100, unique: true})
  email!: string;

  @Column({length: 512})
  password?: string;
  
  @Column()
  lastAccess!: Date;

  @Column({nullable: true})
  emailConfirmedAt?: Date;
}

export interface NewUserRequest {
  name: string,
  email: string,
  password: string
}

export interface LoginRequest {
  email: string,
  password: string
}

export interface LoginResponse {
  id: string,
  email: string,
  name: string,
  token: string,
  lastAccess: Date,
  emailConfirmedAt?: Date
}

export interface UserEmailRequest extends User{
  linkConfirmation: string
}