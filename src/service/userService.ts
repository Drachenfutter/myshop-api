import { hashPassword } from "../common/auth";
import { ERRORS, Fail } from "../common/fail";
import { logger } from "../common/log";
import { uuid } from "../common/utils";
import { NewUserRequest, User } from "../entity/user";
import { getUserByEmail, saveNewUser } from "../resource/userResource";

export async function createNewUser(request: NewUserRequest): Promise<User> {
  let newUser: User = {
    ...request,
    id: uuid(),
    lastAccess: new Date()
  }
  if(!request.password){
    throw new Fail(ERRORS.NEW_USER.PASSWORD_NOT_INFORMED);
  }else{
    newUser.password = await hashPassword(request.password);
  }
  let createdUser: User = await saveNewUser(newUser);
  delete createdUser.password;
  logger.debug(`userService :: createNewUser :: User created: ${JSON.stringify(createdUser)}`);
  return createdUser;
}

export async function getUser(email: string): Promise<User> {
  let user: User = await getUserByEmail(email);
  delete user.password;
  logger.debug(`userService :: getUser :: User: ${JSON.stringify(user)}`);
  return user;
}

export async function updateUser(request: User): Promise<User> {
  let newUser: User = {
    ...request,
    lastAccess: new Date()
  }
  let updatedUser: User = await saveNewUser(newUser);
  delete updatedUser.password;
  logger.debug(`userService :: updateUser :: User updated: ${JSON.stringify(updatedUser)}`);
  return updatedUser;
}