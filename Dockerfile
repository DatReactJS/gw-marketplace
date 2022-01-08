# FROM node:14.16.0 as build

# WORKDIR /app

# COPY package.json package.json

# RUN npm install

# COPY . . 

# RUN npm run build

# # NGINX
# FROM nginx:1.21.3-alpine as prod

# COPY --from=build /app/dist /usr/share/nginx/html
# COPY /nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
