# --- Builder Stage ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npm run build

# --- Runner Stage ---
FROM node:22-alpine AS runner

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3002

# Start the app
CMD ["node", "dist/app/index.js"]