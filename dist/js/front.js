$(document).ready(function(){

    function get_admin_list(){
        $.ajax({
            url:'/handle/admin_list.php',
            type:'get',
            async:true,
            error: function(){
                alert('error');
            },
            success: function(data){
                var admin_lst = JSON.parse(data);
                $("[name=task-list-group]").html("");
                //var admin_lst = eval('('+data+')');
                for(var k in admin_lst["tasks"]){
                    var k_stat = admin_lst["tasks"][k];
                    //$("#admin_list").append("<button class=task_button id="+k+" >"+k+":"+k_stat+"</button><br>");
                    // $("[name=task_dropdown_list]").append("<li><a href='#' class=task_button id="+k+" >"+k+":"+k_stat+"</a></li>");
                    $("[name=task-list-group]").append("<a href='#' class='list-group-item task_button' id="+k+" >"+k+":"+k_stat+"</a>");
                };
            }
        });
    };

    //获取任务列表
    get_admin_list();

    //选择任务,并刷新列表
    $("body").on("click",".task_button",function(){
        //just for debug, will be deleted
        $("#current_task_id").html(this.id);
        get_admin_list();
        current_task_id = this.id;
        $("button[name=scan_log]").click()
    });
    
    //异步查询扫描日志
    $("[name=scan_log]").click(function(){
        $.ajax({
            url:'/handle/scan_log.php',
            type: 'post',
            data: 'taskid='+current_task_id,
            async: true,
            error: function(){
                alert('error');
            },
            success: function(data){
                log_data = JSON.parse(data);
                $("ul[name=display_area]").html("");
                for(var k in log_data["log"]){
                    single_log = log_data["log"][k];
                    if(single_log["level"]==="INFO"){
                        $("ul[name=display_area]").append("<li class='list-group-item list-group-item-info'>"+single_log['level']+":"+single_log['message']+"</li>");
                    }
                    else if(single_log["level"]==="WARNING"){
                        $("ul[name=display_area]").append("<li class='list-group-item list-group-item-warning'>"+single_log['level']+":"+single_log['message']+"</li>");
                    }
                    else if(single_log["level"]==="CRITICAL"){
                        $("ul[name=display_area]").append("<li class='list-group-item list-group-item-danger'>"+single_log['level']+":"+single_log['message']+"</li>");
                    }
                    else{
                        $("ul[name=display_area]").append("<li class='list-group-item list-group-item-danger'>"+single_log['level']+":"+single_log['message']+"</li>");
                    }
                };
            }
        });
    });

    //请求扫描结果原始数据
    $("[name=scan_data]").click(function(){
        $.ajax({
            url:'/handle/scan_data.php',
            type: 'post',
            data: 'taskid='+current_task_id,
            async: true,
            error: function(){
                alert('error');
            },
            success: function(data){
                $("[name=display_area]").html("<code>"+data+"</code>");
                //test_var = data;
                result_data = JSON.parse(data);
            }
        });
    });

    //清除任务列表
    $("[name=flush_task_btn").click(function(){
        $.ajax({
            url:'/handle/flush_tasks.php',
            type: 'get',
            async: true,
            error: function(){
                alert('error');
            },
            success: function(data){
                var flush_data = JSON.parse(data);
                if(flush_data["success"]==true){
                    $.notify("All tasks flushed.", "success");
                }else{
                    $.notify("Unknow error occured", "warn");
                }
                get_admin_list();
            }
        });
    });

    //查询扫描状态
    $("[name=scan_status]").click(function(){
        $.ajax({
            url:'/handle/scan_status.php',
            type: 'post',
            data: 'taskid='+current_task_id,
            async: true,
            error: function(){
                alert('error');
            },
            success: function(data){
                $("ul[name=display_area]").html(data);
                status_data = JSON.parse(data);
            }
        });
    });

    //任务提交
    $("input[name=submit_task_btn]").click(function(){
        var formParam = $("#form1").serialize();
        if($("[name=target_url]").val()!=""){
            $.ajax({
                url:'/handle/handler.php',
                type:'post',
                data:formParam,
                async:true,
                error: function(){
                    alert('error');
                },
                success:function(data){
                    //debug code, to be deleted
                    $("ul[name=display_area]").html(data);
                    var task_data = JSON.parse(data);
                    if(task_data["success"]==true){
                        $.notify("Task added", "success");
                    }else{
                        $.notify("Unknow error occured", "warn");
                    }
                    get_admin_list();
                }
            });
        }
        else{
            alert("target_url cannot be blank");
        }
    });
    
    //查询注入点信息
    $("a.result_data_button[name=tech_info]").click(function(){
        try{
            $.ajax({
                url:'/handle/scan_result.php',
                type: 'post',
                data: 'taskid='+current_task_id+'&content_type='+this.id,
                async: true,
                error: function(){
                    $.notify("Error occurred when requesting tech info.", "warn");
                },
                success: function(data){
                    data = data.replace(/^\[(.*)/g,"$1");
                    data = data.replace(/(.*)\]$/g,"$1");
                    data = JSON.parse(data);
                    // for unkonw reason, below regex not work
                    // data = data.replace(/^\[(.*)\]$/g,"$1");
                    $("ul[name=display_area]").html("");
                    $("ul[name=display_area]").append("Back-end DBMS: "+data["dbms"]+"<br>");
                    $("ul[name=display_area]").append("ptype: "+data["ptype"]+"<br>");
                    $("ul[name=display_area]").append("dbms_version: "+data["dbms_version"]+"<br>");
                    $("ul[name=display_area]").append("parameter: "+data["parameter"]+"("+data["place"]+")<br>");
                    $("ul[name=display_area]").append("injection points: <br>");
                    for(var d in data["data"]){
                        $("ul[name=display_area]").append("&nbsp;&nbsp;Title: "+data["data"][d]["title"]+"<br>");
                        $("ul[name=display_area]").append("&nbsp;&nbsp;Payload: "+data["data"][d]["title"]+"<br>");
                        $("ul[name=display_area]").append("<br>");
                    }
                    $("ul[name=display_area]").append("</code>");
                }
            });
        }
        catch(err){
            $.notify("Error occured when requesting techniques info.", "warn");
        }
    }); 

    //查询数据库内容
    $("a.result_data_button[name=db_info]").click(function(){
        $("ul[name=display_area]").html("");
        try{
            $.ajax({
                url:'/handle/scan_result.php',
                type: 'post',
                data: 'taskid='+current_task_id+'&content_type=11', //dbs
                async: false,
                error: function(){
                    $.notify("Error occurred when requesting db info.", "warn");
                },
                success: function(data){
                    if(data===""){
                        $("ul[name=display_area]").append("database: `CURRENT_DB`<br>");
                    } else {
                        $("ul[name=display_area]").append("database: "+data+"<br>");
                    }
                }
            });
        }
        catch(err){
            $.notify("Error occured when requesting techniques info.", "warn");
        }

        try{
            $.ajax({
                url:'/handle/scan_result.php',
                type: 'post',
                data: 'taskid='+current_task_id+'&content_type=12', //tbls
                async: false,
                error: function(){
                    $.notify("Error occurred when requesting db info.", "warn");
                },
                success: function(data){
                    data = data.replace(/\"/,"").replace(/\"$/,"").replace(/\\n/g,"<br>");
                    if(data===""){
                        $("ul[name=display_area]").append("Tables: `CURRENT_Tbl`<br>");
                    } else {
                        $("ul[name=display_area]").append("Tables: <br>"+data+"<br>");
                    }
                }
            });
        }
        catch(err){
            $.notify("Error occured when requesting techniques info.", "warn");
        } 

        try{
            $.ajax({
                url:'/handle/scan_result.php',
                type: 'post',
                data: 'taskid='+current_task_id+'&content_type=13', //cols
                async: true,
                error: function(){
                    $.notify("Error occurred when requesting db info.", "warn");
                },
                success: function(data){
                    data = data.replace(/(?:\r\n|\r|\n)/g, '<br>')
                    $("ul[name=display_area]").append("Columns: "+data+"<br>");
                }
            });
        }
        catch(err){
            $.notify("Error occured when requesting techniques info.", "warn");
        }

        try{
            $.ajax({
                url:'/handle/scan_result.php',
                type: 'post',
                data: 'taskid='+current_task_id+'&content_type=14', //schema
                async: true,
                error: function(){
                    $.notify("Error occurred when requesting db info.", "warn");
                },
                success: function(data){
                    $("ul[name=display_area]").append(data);
                }
            });
        }
        catch(err){
            $.notify("Error occured when requesting techniques info.", "warn");
        }                              
    });

    //$("input[name=ajax_test]").click(function(){
        //$.ajax({
            //url:'hello.php',
            //type:'post',
            //data:'test=hello',
            //async:true,
            //error: function(){
                //alert('error');
            //},
            //success:function(data){
                //$("#ajax_result").html(data);
            //}
        //});
    //});

});
