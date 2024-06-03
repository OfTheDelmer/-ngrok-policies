# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy the index.js, public, and views directories to the working directory
COPY index.js .
COPY public public/
COPY views views/

# Set the environment variable for the port
ENV PORT=3000

# Expose the port the app runs on
EXPOSE $PORT

# Define the command to run the app
CMD [ "node", "index.js" ]