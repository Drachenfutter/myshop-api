import * as Queue from 'fastq';
import nodemailer from 'nodemailer';
import { ERRORS, Fail } from '../common/fail';
import { CONST, PARMS } from '../common/labels';
import { uuid } from '../common/utils';
import { Authorization } from '../entity/authorization';
import { User, UserEmailRequest } from '../entity/user';
import { getAuthorization, saveAuthorization } from '../resource/authorizationResource';
import { updateUser, getUser } from './userService';

let queue = Queue.promise(mountAndSend, 1);

async function mountAndSend (request: UserEmailRequest) {
  const transport = nodemailer.createTransport({
    host: PARMS.EMAIL.HOST,
    port: PARMS.EMAIL.PORT,
    auth: {
      user: PARMS.EMAIL.AUTH.USER,
      pass: PARMS.EMAIL.AUTH.PASS
    }
  });

  await transport.sendMail({
    from: '"MyShop Welcome" <sec@myshop.com>',
    to: request.email,
    subject: `Welcome, ${request.name.split(' ')[0]}`,
    text: "Welcome!",
    html: bodyEmail(request.name, request.linkConfirmation),
  });
}

function bodyEmail(userName:string, linkConfirmation: string): string{
  return `<!DOCTYPE html><html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge" /><style type="text/css">body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}img{-ms-interpolation-mode:bicubic}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none}table{border-collapse:collapse !important}body{height:100% !important;margin:0 !important;padding:0 !important;width:100% !important}a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important}@media screen and (max-width:600px){h1{font-size:18px !important;line-height:18px !important}}div[style*="margin: 16px 0;"]{margin:0 !important}</style></head><body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;"><div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We\'re thrilled to have you here! Get ready to dive into your new account.</div><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td bgcolor="#012A36" align="center"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td align="center" valign="top" style="padding: 40px 10px 40px 10px;"></td></tr></table></td></tr><tr><td bgcolor="#012A36" align="center" style="padding: 0px 10px 0px 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;"><h1 style="font-size: 26px; font-weight: 400; margin: 2;">Welcome, <strong>${userName}</strong></h1> <img src=" https://img.icons8.com/bubbles/344/checked.png" width="125" height="120" style="display: block; border: 0px;" /></td></tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">We\'re excited to have you get started. First, you need to confirm your account. Just press the button below.</p></td></tr><tr><td bgcolor="#ffffff" align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" style="border-radius: 3px;" bgcolor="#012A36"><a href="${linkConfirmation}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #012A36; display: inline-block;">Confirm Account</a></td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;"><p style="margin: 0;">Cheers,<br>My<strong>Shop</strong></p></td></tr></table></td></tr></table></body></html>`;
}

export async function sendEmailConfirmation(userEmail: string){
  const user = await getUser(userEmail) as User;
  if(user.emailConfirmedAt){
    throw new Fail(ERRORS.AUTH.EMAIL_VALIDED);
  }

  const confirmationCode = uuid();
  const linkConfirmation: string = CONST.APP_HOST + CONST.ROUTE.CONFIRM_EMAIL + '/' + confirmationCode;

  try{
    await saveAuthorization({
      userId: user.id,
      confirmation: confirmationCode,
      createdAt: new Date(),
      email: user.email
    });
  }catch(err){
    throw new Fail(ERRORS.AUTH.CONFIRMATION_CODE_FAIL, err.message);
  }
  const emailRequest: UserEmailRequest = {
    ...user,
    linkConfirmation: linkConfirmation
  }
  queue.push(emailRequest);
}

export async function confirmEmail(token: string): Promise<User>{
  const auth: Authorization = await getAuthorization(token);
  if(!auth){
    throw new Fail(ERRORS.AUTH.CONFIRM_EMAI_NO_TOKEN);
  }
  const user: User = await getUser(auth.email);
  const updateUserRequest: User = {
    ...user,
    emailConfirmedAt: new Date()
  }
  return await updateUser(updateUserRequest);
}

