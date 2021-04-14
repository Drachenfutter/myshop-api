import * as tested from '../../src/service/productService';
import * as productResource from "../../src/resource/productResource";
import { Product } from '../../src/entity/product';

const product_one: Product = {
  userId: 'idUser',
  id: 'newId',
  name: 'Testância da Silva',
  price: 1.99
}

jest.mock('../../src/resource/productResource', () => ({
  ...productResource,
  saveNewProduct: () => {
    return <Product>(product_one);
  }
}));

test('Should Create New Product', async () => {
  const newProduct = await tested.createNewProduct(
    'idUser',
    {
      name: 'Testância da Silva',
      description: 'bem legal',
      price: 1.99,
    }
  );
  expect(newProduct.id).toBe(product_one.id);
  expect(newProduct.name).toBe(product_one.name);
  expect(newProduct.price).toBe(product_one.price);
  expect(newProduct.userId).toBe(product_one.userId);
});