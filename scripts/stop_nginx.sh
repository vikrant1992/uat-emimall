#!/bin/bash
# start nginx

rm -rf /var/www/html/emimall-uat/app
rm -rf /var/www/html/app/code
rm -rf /var/www/html/app/design

cp -r /var/www/html/emimall-uat/app/code /var/www/html/app/
cp -r /var/www/html/emimall-uat/app/design /var/www/html/app/
