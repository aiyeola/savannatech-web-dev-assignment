# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript configuration
COPY tsconfig.json ./

# Install development dependencies needed for building
RUN npm ci

# Copy source code
COPY src/ ./src/
COPY config/ ./config/

# Build the application
RUN npm run build

# Remove development dependencies to reduce image size
RUN npm ci --only=production && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001

# Create data and logs directories, set ownership and read/write permissions
RUN mkdir -p /app/data /app/logs && \
  chown -R nodejs:nodejs /app/data /app/logs && \
  chmod -R 770 /app/data /app/logs

# Copy database and set ownership to nodejs user
COPY --chown=nodejs:nodejs ./data/data.db /app/data/data.db

# Ensure database file has proper read/write permissions
RUN chmod 660 /app/data/data.db

# Switch to non-root user
USER nodejs

# Expose the port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
