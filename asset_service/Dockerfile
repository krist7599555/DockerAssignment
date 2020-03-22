# Use Node v8 as the base image.
FROM node:8

# You need to add commands for the following sections!!!

# krist cache npm
ADD package.json /app/
WORKDIR /app
RUN npm install

# --> Add everything in the current directory to our image, in the 'app' folder.
ADD . /app

# --> Install dependencies
RUN cd /app; npm install
RUN cd /app; cat index.js
RUN cd /app; cat package.json

# --> Expose our server port.
EXPOSE 8080
VOLUME /app

# --> Run our app.
CMD ["node", "/app/index.js"]
