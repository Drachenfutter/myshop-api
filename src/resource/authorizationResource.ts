import { getRepository } from "typeorm";
import { Authorization } from "../entity/authorization";

export async function saveAuthorization(request: Authorization): Promise<Authorization> {
  const authRepo = getRepository(Authorization);
  const auth = new Authorization();
  return authRepo.save({
    ...auth,
    ...request});
}

export async function getAuthorization(token: string): Promise<Authorization> {
  const authRepo = getRepository(Authorization);
  return await authRepo.findOne({confirmation: token}) as Authorization;
}