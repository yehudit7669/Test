FROM node:20.4.0 as build
ARG appUrl
ARG wsUrl
WORKDIR /app
COPY . /app
RUN npm install
ENV VITE_REACT_APP_URL=$appUrl
ENV VITE_WS_URL=$wsUrl
RUN npm run build

FROM nginx:1.25.1
COPY --from=build /app/dist /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]