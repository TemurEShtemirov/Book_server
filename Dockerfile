# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your application listens on
EXPOSE 8435

# Start the application
CMD [ "node", "app.js" ]