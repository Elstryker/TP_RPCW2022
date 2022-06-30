FROM node:16.14.0
WORKDIR /auth
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]