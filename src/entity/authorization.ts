import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Authorization {
  @PrimaryColumn({length: 512, unique: true})
  confirmation!: string;

  @Column({length: 32})
  userId!: string;

  @Column({length: 100})
  email!: string;
  
  @Column()
  createdAt!: Date;

  @Column({nullable: true})
  confirmedAt?: Date;
}