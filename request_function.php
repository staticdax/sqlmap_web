<?php
    $host_ip = "http://127.0.0.1";
    //$host_ip = "http://192.168,235,8";
	$port = 8775;
	$url = $host_ip.":".$port;

    function new_task(){
        $result = file_get_contents($GLOBALS['url'].'/task/new');
        return $result;
    }

   //new_task(); 
    
    function admin_list(){
        $result = file_get_contents($GLOBALS['url'].'/admin/0/list');
        //echo $result;
        return $result;
    }

    //echo(admin_list());

    function admin_flush(){
        $result = file_get_contents($GLOBALS['url'].'admin/0/flush');
        return $result;
    }

    function admin_kill_task($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/kill');
        return $result;
    }


    function scan_log($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/log');
        return $result;
    }

    //echo(scan_log('71f9961ad5cdfb74'));


    function scan_data($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/data');
        return $result;
    }
    
    
    //echo(scan_data('71f9961ad5cdfb74'));

    function scan_status($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/status');
        return $result;
    }


    //echo(scan_status('71f9961ad5cdfb74'));

    function scan_stop($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/stop');
        return $result;
    }


    //echo(scan_stop('71f9961ad5cdfb74'));

    function scan_start($taskid,$post_data){
        $postdata = http_build_query($post_data);
        $options = array(
            'http' => array(
                'method' => 'POST',
                'header' => 'Content-type:application/json',
                'content' => $post_data
            )
        );
        $content = stream_context_create($options);
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/start',false,$content);
        return $result;
    }

    $req = array(
        'getDbs' => True,
        'url' => 'http://www.aradergalleries.com/catgallery.php?id=2'
    );
    //$req_json = json_encode($req,JSON_UNESCAPED_SLASHES);
    //echo $req_json;

    //scan_start('71f9961ad5cdfb74',$req_json);
    //echo(scan_status('71f9961ad5cdfb74',$req_json));
      
      
     
	//function send_post($post_data) {  
          //$postdata = http_build_query($post_data);  
          //$options = array(  
			//'http' => array(  
				//'method' => 'POST',  
                //'header' => 'Content-type:application/json',  
				//'content' => $postdata,  
				//'timeout' => 15 * 60 // 超时时间（单位:s）  
                //)	  
          //);  
          //$content = stream_context_create($options);  
          //$result = file_get_contents($GLOBALS['url'], false, $content);
         //return $result;  
	//}  
?>
