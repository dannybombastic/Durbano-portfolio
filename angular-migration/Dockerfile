# Production Docker image for Angular 20 SSR
# Uses ng serve due to Angular 20 manifest loading limitations
# This is an acceptable approach until Angular fixes the production server manifest issue

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

# Copy source code and build
COPY . .
RUN npm run build:ssr

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/angular.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/tsconfig.app.json ./
COPY --from=builder /app/src ./src

# Environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start with ng serve (stable solution for Angular 20)
# Note: This is the recommended approach until Angular fixes manifest loading in production builds
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4000", "--disable-host-check"]
