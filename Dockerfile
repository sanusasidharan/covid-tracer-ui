FROM node:12

ENV PY_ENDPOINT=http://covid-tracker-python-covid-tracker.sandbox-ocp431-one-89dadfe96916fcd27b299431d0240c37-0000.eu-gb.containers.appdomain.cloud/

COPY package*.json ./

RUN npm install
COPY . .

#permission issue
USER root
RUN chmod 777 -R /public


EXPOSE 8080
CMD [ "npm", "start" ]