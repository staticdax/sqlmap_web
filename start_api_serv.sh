#!/usr/bin/env bash
echo "" > /var/www/sqlmap_web/api_serv.log
sqlmapapi -s -H 127.0.0.1 | tee /var/www/sqlmap_web/api_serv.log & sleep 2 && chmod o+r /tmp/sqlmapipc-*
