import { Express, Request, Response } from "express";
import * as UserService from "../service/userService";
import * as ProductService from "../service/productService";
import * as AuthService from "../service/authService";
import * as UploadService from "../service/uploadService";
import * as MailService from "../service/mailService";
import { CONST } from "./labels";
import { FormatError } from "./fail";
import { getJwtFromHeader, validateHeader } from "./auth";

import multer from 'multer';
const upload = multer({ dest: 'public/images/products/'})

function welcome(_request: Request, response: Response){
  response.send({ok: true});
}

async function createUser(request: Request, response: Response){
  try{
    response.status(201).json(await UserService.createNewUser(request.body));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function getUser(request: Request, response: Response){
  try{
    response.status(200).json(await UserService.getUser(request.params.email));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function getProduct(request: Request, response: Response){
  try{
    response.status(200).json(await ProductService.getProduct(request.params.id));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function listProducts(request: Request, response: Response){
  const autorization = getJwtFromHeader(request);
  try{
    if(autorization){
      const jwt = await validateHeader(request);
      response.status(200).json(await ProductService.listProducts(jwt.userId));
    }else{
      response.status(200).json(await ProductService.listProducts());
    }
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function listImages(request: Request, response: Response){
  try{
    response.status(200).json(await UploadService.listImages(request.params.id));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function createProduct(request: Request, response: Response){
  try{
    const jwt = await validateHeader(request);
    response.status(201).json(await ProductService.createNewProduct(jwt.userId, request.body));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function updateProduct(request: Request, response: Response){
  try{
    await validateHeader(request);
    response.status(200).json(await ProductService.updateProduct(request.body));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function uploadFile(request: Request, response: Response){
  try{
    const jwt = await validateHeader(request);
    response.status(200).json(await UploadService.uploadFile(jwt.userId, request));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function deleteFile(request: Request, response: Response){
  try{
    await validateHeader(request);
    response.status(200).json(await UploadService.deleteImage(request.params.id));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function sendEmailConfirmation(request: Request, response: Response){
  try{
    await validateHeader(request);
    response.status(200).json(await MailService.sendEmailConfirmation(request.body.userEmail));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function confirmEmail(request: Request, response: Response){
  try{
    response.status(200).json(await MailService.confirmEmail(request.params.token));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

async function login(request: Request, response: Response){
  try{
    response.status(201).json(await AuthService.login(request.body));
  }catch(err){
    const error = FormatError(err);
    response.status(error.statusCode).json(error);
  }
}

export function routes(app:Express){
  app.route('/').get(welcome);
  app.route(CONST.ROUTE.USER).post(createUser);
  app.route(CONST.ROUTE.USER + '/:email').get(getUser);
  app.route(CONST.ROUTE.PRODUCT + '/:id').get(getProduct);
  app.route(CONST.ROUTE.PRODUCT + '/:id' + CONST.ROUTE.IMAGE).get(listImages);
  app.route(CONST.ROUTE.PRODUCT + '/:productId' + CONST.ROUTE.IMAGE + '/:id').delete(deleteFile);
  app.route(CONST.ROUTE.PRODUCTS).get(listProducts);
  app.route(CONST.ROUTE.PRODUCT).post(createProduct);
  app.route(CONST.ROUTE.PRODUCT).put(updateProduct);
  app.route(CONST.ROUTE.PRODUCT + CONST.ROUTE.IMAGE +'/:productId').post(upload.single(CONST.UPLOAD_IMAGE_KEY), uploadFile);
  app.route(CONST.ROUTE.SEND_EMAIL).post(sendEmailConfirmation);
  app.route(CONST.ROUTE.CONFIRM_EMAIL + '/:token').get(confirmEmail);
  app.route(CONST.ROUTE.LOGIN).post(login);
}