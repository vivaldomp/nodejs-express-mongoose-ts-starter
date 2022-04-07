# nodejs-express-mongoose-ts-starter

```diff
- UNDER DEVELOPMENT
```

Node.js with Express and Mongoose written with TypeScript for provide a application end-to-end starter with best practices for API development.

## Environment preparation

- Have Git, Docker and docker-compose installed:

[Git Installation](https://www.atlassian.com/git/tutorials/install-git)

[Installing Docker and docker-compose](https://docs.docker.com/get-docker/)

- In a directory of your choice, clone the repository:

```bash
git clone https://github.com/vivaldomp/nodejs-express-mongoose-ts-starter.git
```

## Starting

- create an .env file in the project root to provide the environment variables for the proper configuration of the containers. Example:

```env
MONGO_HOST=localhost
MONGO_ROOT_USERNAME=root
MONGO_ROOT_PASSWORD=rootpass
MONGO_DBNAME=customer
MONGO_EXPRESS_USER=express
MONGO_EXPRESS_PASSWORD=express
```

- from the directory where the docker-compose.local.yml file is, type:

```bash
npm run stack:up
```

If everything is configured according to the steps above the containers will be running and the mongodb will already be populated.

## With containers running

### Mongo-express

You can explore mongodb content through mongo-express. To do this with docker-compose up working, navigate to `http://localhost:8081`

- for mongo express login:

```text
user: express
password: express
```

### Swagger API

You can access the APIs documentation at `http://localhost:3000/api/`
