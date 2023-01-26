# pull official base image
FROM node:16.13-alpine3.13 as build-stage
# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install
# add app
COPY . .

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html


# If you are using react router and nginx 
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf 


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
# docker build -t react-docker:latest .
# docker run -d -p 3000:80 react-docker
# CMD npm start