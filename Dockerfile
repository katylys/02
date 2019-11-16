FROM mongo:3.6.3-jessie

COPY dev.dump .

COPY mongo.sh mongo.sh
RUN chmod 777 mongo.sh

ENTRYPOINT ./mongo.sh
