FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port (default Next.js port)
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]