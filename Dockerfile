# Use the official Node.js image as a base
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the Angular app source
COPY . .

# Build the Angular app
RUN npm run build --prod

# Serve the built Angular app using Nginx
FROM nginx:alpine

# Copy the built app from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
