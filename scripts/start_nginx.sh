#!/bin/bash
# starting nginx service

chown emimall-prod:nginx -R /var/www/html

cp -rf /var/www/html/emimall-uat/app/code /var/www/html/app/code
cp -rf /var/www/html/emimall-uat/app/design /var/www/html/app/design
