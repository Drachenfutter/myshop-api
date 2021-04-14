import { getRepository } from "typeorm";
import { logger } from "../common/log";
import { User } from "../entity/user";

export async function saveNewUser(userRequest: User): Promise<User> {
  const userRepo = getRepository(User);
  const user = new User();
  return userRepo.save({
    ...user,
    ...userRequest
  });
}

export async function getUserByEmail(email: string): Promise<User> {
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({ email: email });
  if(user){
    return user;
  }else{
    logger.error(`userResource :: getUserByEmail :: email: ${email} - Not found`)
    throw new Error('User not found');
  }
}