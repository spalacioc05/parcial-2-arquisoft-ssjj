FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_API_URL=http://localhost:8080
ARG VITE_API_ACCEPT=application/vnd.parcial.v1+json
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_ACCEPT=$VITE_API_ACCEPT
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV HOST=0.0.0.0
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "run", "preview"]
