#!/bin/sh

#Starting Main JS
pm2 start /srv/test/ACM-Payment/node/main.js --name "ACM-Payment-Server" --log-date-format "MM-DD-YYYY HH:mm:ss" --watch --ignore-watch logs --output "/srv/test/ACM-Payment/node/logs/server.log" --error "/srv/test/ACM-Payment/node/logs/error.log"