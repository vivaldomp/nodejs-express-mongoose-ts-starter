
import { Express, Request, Response } from 'express';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import ENVIRONMENT from "../env";

const swagger = (app: Express) => {
  
  const config = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        // API informations (required)
        title: 'API Starter',
        version: '1.0.0',
        description: 'API Starter based on nodejs with typescript',
        contact: {
          name: "Vivaldo Mendonça Pinto",
          url: "https://github.com/vivaldomp",
          email: "vivaldomp@gmail.com"
        }
      },
      host: ENVIRONMENT.API.URL,
      basePath: '/',
      tags: [
        {
          name:"customers",
          description: "Operations on customers",
          externalDocs: {
            description: "Find out more",
            url: "https://github.com/vivaldomp/nodejs-express-mongoose-ts-starter.git"
          }  
        },
      ],
      schemes: ["http","https"],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    apis: ["src/routes/**/*.swagger.routes.ts"],
  };
  const swaggerDocs = swaggerJsDoc(config);

  let options = {
    customCss: '.swagger-ui .topbar { display: none }'
  };

  app.use(ENVIRONMENT.API.CONTEXT_SWAGGER, swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));
  app.get(`${ENVIRONMENT.API.CONTEXT_SWAGGER}.json'`, (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
  });
};

export default swagger;