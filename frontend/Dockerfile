# Use Node.js for building the frontend
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the frontend
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine

# Copy build output to Nginx's default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for serving the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
