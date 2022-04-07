FROM node:16.14.2-alpine3.15

WORKDIR /app

COPY package*.json ./
RUN npm install --no-optional
ADD . .
RUN chmod +x migration.sh
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "serve" ]