#!/bin/bash
# starting nginx service

chown emimall-prod:nginx -R /var/www/html

sudo chmod -R 0777 generated/ pub/static/ var/*

php bin/magento setup:upgrade
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush
sudo chmod -R 0777 generated/ pub/static/ var/*