
#!/bin/bash
# starting nginx service

sudo sh /home/ec2-user/permission.sh

\cp -rf /app/magento/emimall-uat/app/code /app/magento/app
\cp -rf /app/magento/emimall-uat/app/design /app/magento/app

chmod -R 0777 /app/magento/generated/
chmod -R 0777 /app/magento/pub/static/

php /app/magento/bin/magento setup:upgrade
php /app/magento/bin/magento setup:static-content:deploy -f
