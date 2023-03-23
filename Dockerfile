# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the app's source code to the container
COPY . .

# Build the app
RUN yarn run build

# Expose port 80 to the outside world
EXPOSE 100

# Define the command to start the app
CMD [ "yarn", "start" ]
