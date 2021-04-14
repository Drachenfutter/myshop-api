import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { ImageProduct } from "./imageProduct";

@Entity()
export class Product {
  @PrimaryColumn({length: 32, unique: true})
  userId!: string;

  @PrimaryColumn({length: 32, unique: true})
  id!: string;

  @Column({length: 200})
  name!: string;

  @Column({length: 500, nullable: true})
  description?: string;

  @Column({type: 'numeric'})
  price!: number;
  
  @Column({nullable: true})
  publishedAt?: Date;

  @Column({default: true})
  active?: boolean;

  @OneToMany(_type => ImageProduct, imageProduct => imageProduct.product)
  imagesProduct?: ImageProduct[];
}

export interface NewProductRequest {
  name: string,
  description: string,
  price: number,
  publishedAt?: Date,
  active?: boolean
}

export interface UpdateProductRequest {
  userId: string,
  id: string,
  name: string,
  description: string,
  price: number,
  publishedAt?: Date,
  active?: boolean
}