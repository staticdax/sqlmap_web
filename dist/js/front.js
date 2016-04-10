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


    $("body").on("click",".task_button",function(){
        //just for debug, will be deleted
        $("#current_task_id").html(this.id);
        get_admin_list();
        current_task_id = this.id;
        $("button[name=scan_log]").click()
    });
    
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
                    $("ul[name=display_area]").html(data);
                }
            });
        }
        catch(err){
            $.notify("Error occured when requesting techniques info.", "warn");
        }
    }); 

    $("a.result_data_button[name=db_info]").click(function(){
        $("ul[name=display_area]").html("");
        try{
            $.ajax({
                url:'/handle/scan_result.php',
                type: 'post',
                data: 'taskid='+current_task_id+'&content_type=11', //dbs
                async: true,
                error: function(){
                    $.notify("Error occurred when requesting db info.", "warn");
                },
                success: function(data){
                    $("ul[name=display_area]").append("database: "+data+"</br>");
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
                async: true,
                error: function(){
                    $.notify("Error occurred when requesting db info.", "warn");
                },
                success: function(data){
                    $("ul[name=display_area]").append("Tables: "+data+"</br>");
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
                    $("ul[name=display_area]").append("Columns: "+data+"</br>");
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


    get_admin_list();

});
