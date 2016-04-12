<?php
include "../include/api_serv_conf.php";

    //新建任务，
    function new_task(){
        $result = file_get_contents($GLOBALS['url'].'/task/new');
        return $result;
    }

    //获取任务列表
    function admin_list(){
        $result = file_get_contents($GLOBALS['url'].'/admin/0/list');
        //echo $result;
        return $result;
    }

    //清除整个任务列表
    function admin_flush(){
        $result = file_get_contents($GLOBALS['url'].'/admin/0/flush');
        return $result;
    }

    //清除单个任务
    function admin_kill_task($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/kill');
        return $result;
    }

    //获取扫描日志
    function scan_log($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/log');
        return $result;
    }

    //获取扫描结果数据
    function scan_data($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/data');
        return $result;
    }

    //获取扫描状态
    function scan_status($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/status');
        return $result;
    }

    //停止扫描
    function scan_stop($taskid){
        $result = file_get_contents($GLOBALS['url'].'/scan/'.$taskid.'/stop');
        return $result;
    }

    //开始扫描
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
    
    // $req = array(
    //     'getDbs' => True,
    //     'url' => 'http://www.aradergalleries.com/catgallery.php?id=2'
    // );
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
