FROM node:18.14.0

WORKDIR /app

COPY . .

EXPOSE 4200

RUN npm install

RUN npm run config --gateway=gateway:9000 --graphql=grapql-mocker:8081

CMD ["npm", "run", "start"]