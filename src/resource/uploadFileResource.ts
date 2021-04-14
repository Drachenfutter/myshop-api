import { getRepository } from "typeorm";
import { logger } from "../common/log";
import { ImageProduct } from "../entity/imageProduct";
import fs from 'fs';

export async function insertImage(imageRequest: ImageProduct): Promise<ImageProduct> {
  const imageRepo = getRepository(ImageProduct);
  const image = new ImageProduct();
  return imageRepo.save({
    ...image,
    ...imageRequest
  });
}

export async function listImages(productId: string): Promise<ImageProduct[]> {
  const imageRepo = getRepository(ImageProduct);
  let images: ImageProduct[] = await imageRepo.find({productId: productId});
  logger.debug(`uploadFileResource :: listImages :: productId: ${productId} ::  ${images.length}`);
  return images;
}

export async function deleteImage(imageId: string): Promise<void> {
  try{
    const filePath = 'public/images/products/'+imageId; 
    fs.unlinkSync(filePath);
  }catch(err){
  }
  const imageRepo = getRepository(ImageProduct);
  imageRepo.delete({id: imageId});
}