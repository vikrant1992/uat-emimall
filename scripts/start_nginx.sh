#!/bin/bash
# starting nginx service

chown emimall-prod:nginx -R /var/www/html

cp -r /var/www/html/emimall-uat/app/code /var/www/html/app/
cp -r /var/www/html/emimall-uat/app/design /var/www/html/app/

