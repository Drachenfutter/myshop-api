import { routes } from '../../src/common/routes';
import express from 'express';

const app = express();

test('Should have Route: /user', () => {
  routes(app);
  app._router.stack.forEach((appRoute: any) => {
    if(appRoute.route && appRoute.route.path == "/user"){
      expect(true).toBe(true)
    }
  })
});
test('Should have Route: /user/:email', () => {
  routes(app);
  app._router.stack.forEach((appRoute: any) => {
    if(appRoute.route && appRoute.route.path == "/user/:email"){
      expect(true).toBe(true)
    }
  })
});