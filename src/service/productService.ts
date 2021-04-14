import { ERRORS, Fail } from "../common/fail";
import { logger } from "../common/log";
import { uuid } from "../common/utils";
import { NewProductRequest, Product } from "../entity/product";
import * as ProductResource from "../resource/productResource";

export async function createNewProduct(userId: string, request: NewProductRequest): Promise<Product> {
  if(!userId){
    throw new Fail(ERRORS.AUTH.INVALID_ACCESS_TOKEN);
  }

  let newProduct: Product = {
    ...request,
    userId: userId,
    id: uuid()
  }
  let createdProduct: Product = await ProductResource.saveNewProduct(newProduct);
  logger.debug(`productService :: createNewProduct :: Product created: ${JSON.stringify(createdProduct)}`);
  return createdProduct;
}

export async function getProduct(id: string): Promise<Product> {
  let product: Product = await ProductResource.getProductById(id);
  logger.debug(`productService :: getProduct :: Product: ${JSON.stringify(product)}`);
  return product;
}

export async function updateProduct(request: Product): Promise<Product> {
  const updatedProduct = await ProductResource.updateProduct(request);
  logger.debug(`productService :: createNewProduct :: Product created: ${JSON.stringify(updatedProduct)}`);
  return updatedProduct;
}

export async function listProducts(userId?: string): Promise<Product[]> {
  const products: Product[] = await ProductResource.listProducts(userId);
  logger.debug(`productService :: listProducts :: Products: ${JSON.stringify(products)}`);
  return products;
}