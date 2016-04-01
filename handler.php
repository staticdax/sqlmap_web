<?php
    include './request_function.php';
	//$api_request = array('url'=>'','getDbs'=>False,'getTables'=>False,'getColumns'=>False);

    function clean($text)
    {
        $text = trim( preg_replace( '/\s+/', ' ', $text ) );  
        $text = preg_replace("/(\r\n|\n|\r|\t)/i", '', $text);
        return $text;
    }


    $api_request = array();

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

    //$req = array(
        //'getDbs' => true,
        //'url' => 'http://www.aradergalleries.com/catgallery.php?id=2'
    //);

    $api_json = json_encode($api_request,JSON_UNESCAPED_SLASHES);

    $new_task_result = json_decode(new_task(),true);
    if($new_task_result['success'] == 'true'){
        //echo($new_task_result['taskid']);
        $taskid = $new_task_result['taskid'];
        $scan_start_result = scan_start($taskid,$api_json);
        
        echo($scan_start_result);
    }


?>
