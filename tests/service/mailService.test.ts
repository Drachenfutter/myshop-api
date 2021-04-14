import * as tested from '../../src/service/mailService';
import * as authorizationResource from "../../src/resource/authorizationResource";
// import { Product } from '../../src/entity/product';
import { Authorization } from '../../src/entity/authorization';
import { User } from '../../src/entity/user';
import * as userService from '../../src/service/userService'

// const product_one: Product = {
//   userId: 'idUser',
//   id: 'newId',
//   name: 'Testância da Silva',
//   price: 1.99
// }

jest.mock('../../src/resource/authorizationResource', () => ({
  ...authorizationResource,
  getAuthorization: () => {
    return <Authorization>({
      userId: 'idUser',
      confirmation: 'superToken',
      createdAt: new Date(),
      email: 'mockardo@node.com'
    });
  }
}));

const user_one: User = {
  id: 'newId',
  email: 'testancia@jest.com',
  name: 'Testância da Silva',
  password: 'superPassword',
  lastAccess: new Date()
}

jest.mock('../../src/service/userService', () => ({
  ...userService,
  getUser: () => {
    return <User>(user_one);
  },
  updateUser: () => {
    return <User>(user_one);
  }
}));

test('Should Start Email Confirmation', async () => {
  const emailConfirmed = await tested.confirmEmail('superToken');
  expect(emailConfirmed.id).toBe(user_one.id);
});