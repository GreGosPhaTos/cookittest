FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# BUILD
RUN npm run build

# NEXT STAGE
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=0 /usr/src/app/dist ./dist
RUN npm install --only=prod
RUN npm install pm2 -g

EXPOSE 8080

CMD ["pm2-runtime","dist/app.js"]
# CMD ["node","dist/app.js"]

