import { customAlphabet } from "nanoid";

export function uuid(): string {
  const nanoid = customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 32);
  return nanoid();
}