#!/bin/bash -x
exec &> githook.log

npm install
gulp build

cp -rf ./dist/bundle.js /var/www/api-canary/app/static/dist/bundle.js
cp -rf ./dist/bundle.js.map /var/www/api-canary/app/static/dist/bundle.js.map
cp -rf ./dist/styles.min.css /var/www/api-canary/app/static/dist/styles.min.css