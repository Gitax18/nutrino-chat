FROM node:18-alpine

# create a app directory
WORKDIR /app

# install app dependencies
COPY package*.json ./

# run npm i
RUN npm install

# bundle code to app
COPY . .
# expose the code
EXPOSE 8080

# run the server
CMD [ "npm", "start" ]