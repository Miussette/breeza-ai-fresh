FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY backend/package*.json ./
RUN npm install

COPY backend/ ./
RUN npm run build

EXPOSE 10000

CMD ["npm", "start"]
