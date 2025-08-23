
# ---------- Development Stage ----------
FROM node:20-alpine AS dev
WORKDIR /app

# Install dependencies first for better cache
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 3000

# Default: run dev server (hot reload)
CMD ["npm", "run", "dev"]

# ---------- Production Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=dev /app .
RUN npm run build

# ---------- Production Runner Stage ----------
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start"]