import { Request } from "express";
import { ERRORS, Fail } from "../common/fail";
import { logger } from "../common/log";
import { ImageProduct } from "../entity/imageProduct";
import { Product } from "../entity/product";
import * as UploadResource from "../resource/uploadFileResource";
import { getProduct } from "./productService";


export async function uploadFile(userId: string, request: Request) {
  if(!userId){
    throw new Fail(ERRORS.AUTH.INVALID_ACCESS_TOKEN);
  }

  const product: Product = await getProduct(request.params.productId);

  let newImage: ImageProduct = {
    productId: request.params.productId,
    id: request.file.filename,
    name: request.file.filename,
    product: product,
    active: true    
  }

  let createdProduct: ImageProduct = await UploadResource.insertImage(newImage);
  logger.debug(`uploadService :: uploadFile :: UserId: ${userId} - File: ${JSON.stringify(createdProduct)}`);
  return createdProduct;
}

export async function listImages(projectId: string): Promise<ImageProduct[]> {
  const images: ImageProduct[] = await UploadResource.listImages(projectId);
  logger.debug(`uploadService :: listImages :: images: ${JSON.stringify(images)}`);
  return images;
}

export async function deleteImage(imageId: string): Promise<void> {
  await UploadResource.deleteImage(imageId);
  logger.debug(`uploadService :: deleteImage :${imageId}`);
}
