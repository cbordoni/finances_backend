# Base image
FROM node:18

# Create app directory
WORKDIR /home/node/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build