FROM node:18
WORKDIR /app
COPY ./apps/gateway/package*.json ./
RUN npm install
COPY ./apps/gateway ./
EXPOSE 3001
CMD ["npm", "run", "start:dev"]