FROM node:alpine

COPY package.json ./

COPY server.js ./

#installs the current packages
RUN npm install

EXPOSE 3000

#the below comand is what happens when you run the container
CMD ["node", "server.js"]

