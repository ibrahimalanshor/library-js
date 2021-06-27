# express

## Depedencies

* express
* nodemon
* dotenv
* mongoose
* cors
* express-validator
* bcrypt
* morgan
* jsonwebtoken

## Api Endpoint

### Auth

* `POST` `/api/auth/login` Login Admin

### Rack

* `GET` `/api/rack` Read All Racks
* `POST` `/api/rack` Create New Rack
* `GET` `/api/{slug}` Find Rack
* `PUT` `/api/{id}/` Update Rack
* `DELETE` `/api/{id}/` Delete Rack

### Book

* `GET` `/api/book` Read All Books
* `POST` `/api/book` Create New Book 
* `GET` `/api/{isbn}` Find Books
* `PUT` `/api/{id}` Update Books
* `DELETE` `/api/{id}` Delete Books
* `PATCH` `/api/{id}/addstock` Add Stock Books

## Project setup
```
npm install
```

## Set Config

copy `.env.example` to `.env` and edit

## Start Mongodb

`sudo systemctl start mongod`

## Seed Admin

```
npm run seed
```

## Run
```
npm start
```