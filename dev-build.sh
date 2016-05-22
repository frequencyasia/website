#!/bin/bash -x
exec &> githook.log

npm prune
npm install

gulp build

cp -rf /var/www/website-canary/dist/bundle.js /var/www/api-canary/app/static/dist/bundle.js
cp -rf /var/www/website-canary/dist/bundle.js.map /var/www/api-canary/app/static/dist/bundle.js.map
cp -rf /var/www/website-canary/dist/styles.min.css /var/www/api-canary/app/static/dist/styles.min.css