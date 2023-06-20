FROM node:alpine

WORKDIR /historium

EXPOSE 5000

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
