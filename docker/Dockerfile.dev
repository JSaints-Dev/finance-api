FROM node:20.18-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

RUN npx run prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:dev"]