#!/bin/bash

chown emimall-uat:nginx -R /app/magento

find /app/magento -type d -exec chmod 755 {} \;
find /app/magento -type f -exec chmod 755 {} \;


