#!/bin/bash

sudo sh /home/ec2-user/permission.sh
find /app/magento -type d -exec chmod 755 {} \;
find /app/magento -type f -exec chmod 755 {} \;
chmod -R 0777 /app/magento/var/
chmod -R 0777 /app/magento/generated/
chmod -R 0777 /app/magento/pub/static/

php /app/magento/bin/magento cache:flush
