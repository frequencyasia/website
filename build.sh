#!/bin/bash -x
exec &> githook.log

npm prune
npm install

gulp build-production

cp -rf ./dist/bundle.js /var/www/api-production/app/static/dist/bundle.js
cp -rf ./dist/styles.min.css /var/www/api-production/app/static/dist/styles.min.css