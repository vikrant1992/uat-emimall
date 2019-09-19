#!/bin/bash

sudo sh /home/ec2-user/permission.sh
find /app/magento -type d -exec chmod 755 {} \;
find /app/magento -type f -exec chmod 755 {} \;


