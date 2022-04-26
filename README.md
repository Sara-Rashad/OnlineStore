# Storefront Backend Project

## Required Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Pre-requisits
1- Creatin 2 postgres databases on your local machine, one for development and 1 for testing.

2- Add .env file that contains all nessecary information for database connection:
 HOST=127.0.0.1
 DB_NAME=onlinestore
 DB_NAME_TEST=onlinestore_test
 DB_USER=postgres
 DB_PASSWORD=P@user123
ENV=dev
BCRYPT_PASSWORD=test-password-dev
SALT_ROUNDS=10
TOKEN_SECRET=testTokenToSign

## Testing endpoints 
For testing the routes you should create user , login ,and use the generated token for the other requests
## Scripts

### 1. run script
npm run test  
### 2.  start script
npm run start!
