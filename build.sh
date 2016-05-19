#!/bin/bash -x
exec &> githook.log

npm install
gulp build