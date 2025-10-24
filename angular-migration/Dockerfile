# Multi-stage build for Angular SSR application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source (dist is excluded in .dockerignore, we'll copy it from build)
COPY . .

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dependencies for production runtime
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy the pre-built dist folder from the GitHub Actions build
# This is passed via the tarball in the deployment
COPY dist ./dist

# Expose port
EXPOSE 4000

# Environment variables for production
ENV NODE_ENV=production
ENV PORT=4000

# Start the SSR server using the compiled server bundle
CMD ["node", "dist/daniel-urbano-portfolio/server/server.mjs"]
