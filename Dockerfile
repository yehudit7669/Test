FROM node:18.16.0 as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.23.4
COPY --from=build /app/dist /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]