FROM node:18.14.0

WORKDIR /app

COPY . .

EXPOSE 4200

RUN npm install

RUN npm run config --gateway=http://158.160.57.255:9000 --graphql=http://158.160.57.255:9000

CMD ["npm", "run", "start"]