$(document).ready(function(){

    function get_admin_list(){
        $.ajax({
            url:'admin_list.php',
            type:'get',
            async:true,
            error: function(){
                alert('error');
            },
            success: function(data){
                var admin_lst = JSON.parse(data);
                //var admin_lst = eval('('+data+')');
                for(var k in admin_lst["tasks"]){
                    var k_stat = admin_lst["tasks"][k];
                    $("#admin_list").append("<button class=task_button id="+k+" >"+k+":"+k_stat+"</button><br>");
                };
            }
        });
    };

    var current_task_id = "";

    $("body").on("click",".task_button",function(){
        $("#current_task_id").html(this.id);
        current_task_id = this.id;
    });
    
    $("[name=scan_log]").click(function(){
        $.ajax({
            url:'scan_log.php',
            type: 'post',
            data: 'taskid='+current_task_id,
            async: true,
            error: function(){
                alert('error');
            },
            success: function(data){
                $("[name=display_area]").html(data);
                log_data = JSON.parse(data);
            }
        });
    });

    $("[name=scan_data]").click(function(){
        $.ajax({
            url:'scan_data.php',
            type: 'post',
            data: 'taskid='+current_task_id,
            async: true,
            error: function(){
                alert('error');
            },
            success: function(data){
                $("[name=display_area]").html(data);
                data_data = JSON.parse(data);
            }
        });
    });

    $("[name=scan_status]").click(function(){
        $.ajax({
            url:'scan_status.php',
            type: 'post',
            data: 'taskid='+current_task_id,
            async: true,
            error: function(){
                alert('error');
            },
            success: function(data){
                $("[name=display_area]").html(data);
                status_data = JSON.parse(data);
            }
        });
    });

    $("input[name=submit_btn]").click(function(){
        var formParam = $("#form1").serialize();
        if($("[name=target_url]").val()!=""){
            $.ajax({
                url:'handler.php',
                type:'post',
                data:formParam,
                async:true,
                error: function(){
                    alert('error');
                },
                success:function(data){
                    $("[name=display_area]").html(data);
                    get_admin_list();
                }
            });
        }
        else{
            alert("target_url cannot be blank");
        }
    });

    $("input[name=ajax_test]").click(function(){
        $.ajax({
            url:'hello.php',
            type:'post',
            data:'test=hello',
            async:true,
            error: function(){
                alert('error');
            },
            success:function(data){
                $("#ajax_result").html(data);
            }
        });
    });


    get_admin_list();

});
