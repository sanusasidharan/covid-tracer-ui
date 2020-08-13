FROM node:12

ENV BFF_ENDPOINT=http://covid-tracker-python-covid-tracker.sandbox-ocp431-one-89dadfe96916fcd27b299431d0240c37-0000.eu-gb.containers.appdomain.cloud/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN chown -R 1001:0 /tmp/src

USER 1001

CMD [ "npm", "start" ]
