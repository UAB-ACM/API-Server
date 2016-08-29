#!/bin/sh

#Starting Main JS
pm2 start ./main.js --name "ACM-Payment-Server" --log-date-format "MM-DD-YYYY HH:mm:ss" --watch --ignore-watch logs --output "./logs/server.log" --error "./logs/error.log"
