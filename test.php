<?php
    include './request_function.php';
	//$api_request = array('url'=>'','getDbs'=>False,'getTables'=>False,'getColumns'=>False);


    $api_request = array(
    "crawlDepth"=> "", 
    "osShell"=> False, 
    "getUsers"=> False, 
    "getPasswordHashes"=> False, 
    "excludeSysDbs"=> False, 
    "uChar"=> "", 
    "regData"=> "", 
    "cpuThrottle"=> 5, 
    "prefix"=> "", 
    "code"=> "", 
    "googlePage"=> 1, 
    "query"=> "", 
    "randomAgent"=> False, 
    "delay"=> 0, 
    "isDba"=> False, 
    "requestFile"=> "", 
    "predictOutput"=> False, 
    "wizard"=> False, 
    "stopFail"=> False, 
    "forms"=> False, 
    "taskid"=> "", 
    "skip"=> "", 
    "dropSetCookie"=> False, 
    "smart"=> False, 
    "risk"=> 1, 
    "sqlFile"=> "", 
    "rParam"=> "", 
    "getCurrentUser"=> False, 
    "notString"=> "", 
    "getRoles"=> False, 
    "getPrivileges"=> False, 
    "testParameter"=> "", 
    "tbl"=> "", 
    "charset"=> "", 
    "trafficFile"=> "", 
    "osSmb"=> False, 
    "level"=> 1, 
    "secondOrder"=> "", 
    "pCred"=> "", 
    "timeout"=> 30, 
    "firstChar"=> "", 
    "updateAll"=> False, 
    "binaryFields"=> False, 
    "checkTor"=> False, 
    "aType"=> "", 
    "direct"=> "", 
    "saFreq"=> 0, 
    "tmpPath"=> "", 
    "titles"=> False, 
    "getSchema"=> False, 
    "identifyWaf"=> False, 
    "checkWaf"=> False, 
    "regKey"=> "", 
    "limitStart"=> "", 
    "loadCookies"=> "", 
    "dnsName"=> "", 
    "csvDel"=> ",", 
    "oDir"=> "", 
    "osBof"=> False, 
    "invalidLogical"=> False, 
    "getCurrentDb"=> False, 
    "hexConvert"=> False, 
    "answers"=> "", 
    "host"=> "", 
    "dependencies"=> False, 
    "cookie"=> "", 
    "proxy"=> "", 
    "regType"=> "", 
    "optimize"=> False, 
    "limitStop"=> "", 
    "mnemonics"=> "", 
    "uFrom"=> "", 
    "noCast"=> False, 
    "testFilter"=> "", 
    "eta"=> False, 
    "threads"=> 1, 
    "logFile"=> "", 
    "os"=> "", 
    "col"=> "", 
    "rFile"=> "", 
    "verbose"=> 1, 
    "aCert"=> "", 
    "torPort"=> "", 
    "privEsc"=> False, 
    "forceDns"=> False, 
    "getAll"=> False, 
    "api"=> True, 
    "url"=> "", 
    "invalidBignum"=> False, 
    "regexp"=> "", 
    "getDbs"=> False, 
    "freshQueries"=> False, 
    "uCols"=> "", 
    "smokeTest"=> False, 
    "pDel"=> "", 
    "wFile"=> "", 
    "udfInject"=> False, 
    "tor"=> False, 
    "forceSSL"=> False, 
    "beep"=> False, 
    "saveCmdline"=> False, 
    "configFile"=> "", 
    "scope"=> "", 
    "dumpAll"=> False, 
    "torType"=> "HTTP", 
    "regVal"=> "", 
    "dummy"=> False, 
    "commonTables"=> False, 
    "search"=> False, 
    "skipUrlEncode"=> False, 
    "referer"=> "", 
    "liveTest"=> False, 
    "purgeOutput"=> False, 
    "retries"=> 3, 
    "extensiveFp"=> False, 
    "dumpTable"=> False, 
    "database"=> "/tmp/sqlmapipc-EmjjlQ", 
    "batch"=> True, 
    "headers"=> "", 
    "flushSession"=> False, 
    "osCmd"=> "", 
    "suffix"=> "", 
    "dbmsCred"=> "", 
    "regDel"=> False, 
    "shLib"=> "", 
    "NoneConnection"=> False, 
    "timeSec"=> 5, 
    "msfPath"=> "", 
    "noEscape"=> False, 
    "getHostname"=> False, 
    "sessionFile"=> "", 
    "disableColoring"=> True, 
    "getTables"=> False, 
    "agent"=> "", 
    "lastChar"=> "", 
    "string"=> "", 
    "dbms"=> "", 
    "tamper"=> "", 
    "hpp"=> False, 
    "runCase"=> "", 
    "osPwn"=> False, 
    "evalCode"=> "", 
    "cleanup"=> False, 
    "getBanner"=> False, 
    "profile"=> False, 
    "regRead"=> False, 
    "bulkFile"=> "", 
    "safUrl"=> "", 
    "db"=> "", 
    "dumpFormat"=> "CSV", 
    "alert"=> "", 
    "user"=> "", 
    "parseErrors"=> False, 
    "aCred"=> "", 
    "getCount"=> False, 
    "dFile"=> "", 
    "data"=> "", 
    "regAdd"=> False, 
    "ignoreProxy"=> False, 
    "getColumns"=> False, 
    "mobile"=> False, 
    "googleDork"=> "", 
    "sqlShell"=> False, 
    "pageRank"=> False, 
    "tech"=> "BEUSTQ", 
    "textOnly"=> False, 
    "commonColumns"=> False, 
    "keepAlive"=> False
);


	$target_url = $_POST['target_url'];

	if(!is_null($_POST['getDbs'])){
	    $api_request['getDbs'] = True;
	}

	if(!is_null($_POST['getTables'])){
    	$api_request['getTables'] = True;
	}
	
	if(!is_null($_POST['getColumns'])){
    	$api_request['getColumns'] = True;
	}		

    //echo($_POST['target_url']);
    //echo("<br>");
    //
    //echo("this is a test return.");

	$api_request['url'] = $target_url;
	//var_dump($api_request);
	
	$api_json = json_encode($api_request,JSON_UNESCAPED_SLASHES);
	//var_dump($api_json);

    $req = array(
        'getDbs' => true,
        'url' => 'http://www.aradergalleries.com/catgallery.php?id=2'
    );

    $new_task_result = json_decode(new_task(),true);
    if($new_task_result['success'] == 'true'){
        //echo($new_task_result['taskid']);
        $taskid = $new_task_result['taskid'];
        $scan_start_result = scan_start($taskid,$api_json);
        
        echo($scan_start_result);
    }


?>
