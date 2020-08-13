# pull official base image
FROM node:13.12.0-alpine

ENV BFF_ENDPOINT=http://covid-tracer-bff-node-covid-tracker.sandbox-ocp431-one-89dadfe96916fcd27b299431d0240c37-0000.eu-gb.containers.appdomain.cloud/
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
#COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 3000

RUN chown -R 1001:0 /.config

USER 1001

# start app
CMD ["npm", "start"]
