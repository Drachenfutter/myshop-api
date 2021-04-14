import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { Product } from "./product";

@Entity()
export class ImageProduct {
  @PrimaryColumn({length: 32})
  productId!: string;
  @PrimaryColumn({length: 32, unique: true})
  id!: string;

  @Column({length: 36})
  name!: string;

  @Column({name:'active', default: true})
  active?: boolean;

  @ManyToOne(_type => Product, product => product.imagesProduct)
  product!: Product;
}