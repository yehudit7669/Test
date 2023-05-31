FROM node:20.2.0 as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.25.0
COPY --from=build /app/dist /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]