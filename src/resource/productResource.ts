import { getRepository } from "typeorm";
import { logger } from "../common/log";
import { Product } from "../entity/product";

export async function saveNewProduct(productRequest: Product): Promise<Product> {
  const productRepo = getRepository(Product);
  const product = new Product();
  return productRepo.save({
    ...product,
    ...productRequest
  });
}

export async function getProductById(id: string): Promise<Product> {
  const productRepo = getRepository(Product);
  const product = await productRepo.findOne({ id: id });
  if(product){
    return product;
  }else{
    logger.error(`productResource :: getProductById :: id: ${id} - Not found`)
    throw new Error('Product not found');
  }
}

export async function listProducts(userId?: string, skip?: number): Promise<Product[]> {
  const productRepo = getRepository(Product);
  let products: Product[];
  let total: number = 0;
  let _skip: number = skip || 0;
  if(userId){
    products = await productRepo.find({userId: userId});
  }else{
    [products, total ]= await productRepo.findAndCount(
      {
        take: 100,
        skip: _skip
      }
    );
  }
  logger.debug(`productResource :: listProducts :: userId: ${userId} ::  ${products.length} - total: ${total}`);
  return products;
}

export async function updateProduct(productRequest: Product): Promise<Product> {
  const productRepo = getRepository(Product);
  const product = new Product();
  return productRepo.save({
    ...product,
    ...productRequest
  });
}