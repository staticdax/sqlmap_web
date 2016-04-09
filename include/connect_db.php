<?php
//include '/var/www/sqlmap_web/include/myDB.php';
include './myDB.php';

//$handle = fopen("/var/www/sqlmap_web/api_serv.log", "r");
$handle = fopen("../api_serv.log", "r");
$content = fread($handle, 1024);
fclose($handle);

preg_match('/\/tmp\/sqlmapipc-.*/', $content, $match);
//$db_name = preg_match('/(?<=IPC database: ).*/', $content, $match);

$db_name =  $match[0];
//echo($match[0]);

$db = new SQLite3($db_name);


