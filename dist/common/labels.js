"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARMS = exports.CONST = void 0;
exports.CONST = {
    APP_NAME: 'myshop_api',
    APP_PORT: 3443,
    APP_HOST: 'http://localhost:3000',
    UPLOAD_IMAGE_KEY: 'productImage',
    ROUTE: {
        USER: '/user',
        PRODUCT: '/product',
        PRODUCTS: '/products',
        LOGIN: '/login',
        IMAGE: '/image',
        SEND_EMAIL: '/sendEmailConfirmation',
        CONFIRM_EMAIL: '/confirmEmail',
    }
};
exports.PARMS = {
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    JWT_SECRET: process.env.JWT_SECRET || '@superSecret',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1 day',
    EMAIL: {
        HOST: process.env.EMAIL_HOST || "smtp.mailtrap.io",
        PORT: Number(process.env.EMAIL_PORT) || 2525,
        AUTH: {
            USER: process.env.EMAIL_AUTH_USER || "3f5d1b3dbdf4aa",
            PASS: process.env.EMAIL_AUTH_PASS || "d96eab812df77e"
        }
    }
};
