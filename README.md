# MyShop - API
Application NodeJs provider of basic features for the project [MyShop Web](https://github.com/Drachenfutter/myshop-web).
## Running the project
### Running Postgres via Docker
```cmd
npm run run-postgres
```
### Running the application
```cmd
npm run start
```
### Running the application with hot reload
```cmd
npm run dev
```
## Features:
### User
- Create `/user (POST)`
- Get `/user/:email (GET)`
- Login `/login (POST)`
- Sending email for confirmation `/sendEmailConfirmation (POST)`
- Confirmation of registration by email `/confirmEmail/:token (GET)`

### Product
- Registration `/product (POST)`
- Update `/product (POST)`
- Get `/product/:id (GET)`
- List `/products (GET)`
- Delete (soft delete) `/product (PUT)`
- Reactivate `/product (PUT)`

### Product Image
- Create `/product/image/:productId (POST)`
- List `/product/:id/image (GET)`
- Delete `/product/:productId/image/:imageId (DELETE)`

## Dependencies
### Database
Before running the application, a database [Postgres](https://www.postgresql.org/) must be provided.\
For development purposes, the database in question is being used via **docker**.\
Connection parameters can be informed by environment variables. Default values:

> POSTGRES_HOST *(localhost)*\
POSTGRES_PORT *(5432)*\
POSTGRES_USER *(postgres)*\
POSTGRES_PASSWORD *(superPassword)*\
POSTGRES_DB *(postgres)*

### SMTP Server
For confirmation of users registration, by default, the application is using [Mailtrap](https://mailtrap.io/). It is valid to change these parameters so that the developer has access.

>EMAIL_HOST\
EMAIL_PORT\
EMAIL_AUTH_USER\
EMAIL_AUTH_PASS
