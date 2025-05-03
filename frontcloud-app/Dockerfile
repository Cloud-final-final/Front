# Use an official Node.js image as the build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Declare the build argument
ARG VITE_BACKEND_URL
# Set the environment variable for the build process
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Build the Vue application
RUN npm run build

# Use Nginx as the base image
FROM nginx:alpine

# Copy Vue build files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
