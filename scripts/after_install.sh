#!/bin/bash
# starting nginx service

chown emimall-uat:nginx -R /app/magento

cp -rf /app/magento/emimall-uat/app/code /app/magento/app/code
cp -rf /app/magento/emimall-uat/app/design /app/magento/app/design

php /app/magento/bin/magento setup:upgrade
php /app/magento/bin/magento setup:static-content:deploy -f
php /app/magento/bin/magento cache:flush
