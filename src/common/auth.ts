import { compare, hash, genSalt } from "bcrypt";
import { Request } from "express";
import { sign, verify } from "jsonwebtoken";
import { ERRORS, Fail } from "./fail";
import { PARMS } from "./labels";

export function assignJwt(data: any): string {
  const jwt = sign(data, PARMS.JWT_SECRET, { expiresIn: PARMS.JWT_EXPIRATION });
  return jwt;
}

export async function compareHash(original: string, compared: string): Promise<boolean> {
  return await compare(compared, original)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw new Fail(ERRORS.INTERNAL.BCRIPTY, JSON.stringify(err));
    });
}

export async function hashPassword(password: string): Promise<string> {
  try {
    return await hash(password, await genSalt());
  } catch (error) {
    return '';
  }
}

export function getJwtFromHeader(request: Request): string {
  let accessToken: string = '';
  const autorization = request.headers['authorization'];
  if(autorization){
    accessToken = <string>autorization.split(' ')[1];
  }
  return accessToken;
}


export async function validateHeader(request: Request) {
  const accessToken = getJwtFromHeader(request);
  if(accessToken){
    let jwtOk: any;
    try {
      jwtOk = verify(accessToken, PARMS.JWT_SECRET);
      return jwtOk;
    } catch (err) {
      throw new Fail(ERRORS.AUTH.INVALID_ACCESS_TOKEN, err.message);
    }
  }else{
    throw new Fail(ERRORS.AUTH.NO_ACCESS_TOKEN);
  }

}