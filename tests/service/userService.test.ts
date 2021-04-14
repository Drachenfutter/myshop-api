import * as tested from '../../src/service/userService';
import * as userResource from "../../src/resource/userResource";
import { User } from '../../src/entity/user';
import { ERRORS } from '../../src/common/fail';

const user_one: User = {
  id: 'newId',
  email: 'testancia@jest.com',
  name: 'Testância da Silva',
  password: 'superPassword',
  lastAccess: new Date()
}

jest.mock('../../src/resource/userResource', () => ({
  ...userResource,
  saveNewUser: () => {
    return <User>(user_one);
  },
  getUserByEmail: () => {
    return <User>(user_one);
  }
}));

test('Should Create New User', async () => {
  const newUser = await tested.createNewUser({
    email: 'testancia@jest.com',
    name: 'Testância da Silva',
    password: 'superPassword'
  });
  expect(newUser.id).toBe(user_one.id);
  expect(newUser.email).toBe(user_one.email);
  expect(newUser.emailConfirmedAt).toBeUndefined();
  expect(newUser.lastAccess).toBe(user_one.lastAccess);
  expect(newUser.name).toBe(user_one.name);
  expect(newUser.password).toBe(user_one.password);
});

test('Should Get User', async () => {
  const user = await tested.getUser('mockardo@gmail.com');
  expect(user.id).toBe(user_one.id);
  expect(user.email).toBe(user_one.email);
  expect(user.emailConfirmedAt).toBeUndefined();
  expect(user.lastAccess).toBe(user_one.lastAccess);
  expect(user.name).toBe(user_one.name);
  expect(user.password).toBe(user_one.password);
});

test('Should Update User', async () => {
  const user = await tested.updateUser(user_one);
  expect(user.id).toBe(user_one.id);
  expect(user.email).toBe(user_one.email);
  expect(user.emailConfirmedAt).toBeUndefined();
  expect(user.lastAccess).toBe(user_one.lastAccess);
  expect(user.name).toBe(user_one.name);
  expect(user.password).toBe(user_one.password);
});

test('Should return error when Create New User with no password', async () => {
  try{
    await tested.createNewUser({
      email: 'testancia@jest.com',
      name: 'Testância da Silva',
      password: ''
    });
  }catch(err){
    expect(err.message).toBe(ERRORS.NEW_USER.PASSWORD_NOT_INFORMED.message);
  }
});
