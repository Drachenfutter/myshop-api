import { assignJwt, compareHash } from "../common/auth";
import { ERRORS, Fail } from "../common/fail";
import { logger } from "../common/log";
import { LoginRequest, LoginResponse, User } from "../entity/user";
import * as UserResource from '../resource/userResource';

export async function login(request: LoginRequest): Promise<LoginResponse> {
  let resp: LoginResponse;
  let userDatabase: User;
  
  if(!request.email){
    throw new Fail(ERRORS.LOGIN.LOGIN_NOT_INFORMED);
  }
  if(!request.password){
    throw new Fail(ERRORS.LOGIN.PASSWORD_NOT_INFORMED);
  }

  try{
    userDatabase = await UserResource.getUserByEmail(request.email);
    logger.debug(`authService :: login :: email requested: ${request.email} :: user id: ${userDatabase.id}`);
  }catch(err){
    throw new Fail(ERRORS.LOGIN.USER_NOT_FOUND);
  }
  if(userDatabase.password){
    if (! await compareHash(userDatabase.password, request.password)){
      logger.error(`authService :: login :: email requested: ${request.email} :: user id: ${userDatabase.id} :: Hash fail`);
      throw new Fail(ERRORS.LOGIN.PASSWORD_INVALID);
    };
  }else{
    throw new Fail(ERRORS.LOGIN.PASSWORD_INVALID);
  }
  const token = await assignJwt({
    email: userDatabase.email,
    name: userDatabase.name,
    userId: userDatabase.id
  });

  resp = {
    name: userDatabase.name,
    id: userDatabase.id,
    email: userDatabase.email,
    lastAccess: userDatabase.lastAccess,
    emailConfirmedAt: userDatabase.emailConfirmedAt,
    token: token
  }

  return resp;
}