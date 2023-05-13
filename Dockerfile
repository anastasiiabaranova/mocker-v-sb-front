FROM node:18.14.0

WORKDIR /app

COPY . .

EXPOSE 4200

RUN npm install

CMD ["npm", "run", "start"]