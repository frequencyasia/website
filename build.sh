#!/bin/bash -x
exec &> githook.log

npm prune
npm install

gulp build-production

cp -rf /var/www/website-production/dist/bundle.js /var/www/api-production/app/static/dist/bundle.js
cp -rf /var/www/website-production/dist/bundle.js.map /var/www/api-production/app/static/dist/bundle.js.map
cp -rf /var/www/website-production/dist/styles.min.css /var/www/api-production/app/static/dist/styles.min.css