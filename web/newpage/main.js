
    function check()//检查此用户是否已经拥有队伍(创建队伍||加入队伍)
    {
        /*
        *******************待完善
        ************************
        */
         //return false;
        return true;
    }
    function init()
    {
        if(check()===false)//检查已经登陆的账号是否在数据库中（是否已经有队伍）     如果没有队伍，显示创建队伍或加入队伍
        {
            var bt1=document.getElementsByTagName("button")[0];
            var bt2=document.getElementsByTagName("button")[1];
            
            bt1.addEventListener("click",function(){window.location.href='creatteam.html';});
            bt2.addEventListener("click",function(){window.location.href='jointeam.html';});
        }
        else//显示查看队伍信息和退出队伍
        {
            var bt1=document.getElementsByTagName("button")[0];
            var bt2=document.getElementsByTagName("button")[1];
            var bt3=document.getElementsByTagName("button")[2];
            var bt4=document.getElementsByTagName("button")[3];
            bt1.style.display='none';
            bt2.style.display='none';
            bt3.style.display='inline';
            bt4.style.display='inline';

            bt3.addEventListener("click",function(){window.location.href='teaminfor.html';});//查看队伍信息
            //退出队伍
            bt4.addEventListener("click",function(){
                /*
                ****************************************
                ***********************待完善，删除队伍信息
                */
                //var makeconfirm;
                inputbox("如果确认退出队伍，请输入:Exit",function()
                 {
                    var makeconfirm=document.getElementsByClassName("setinput")[0].value;
                    if(makeconfirm==="Exit")
                    {
                        //删除队伍信息
                        /*
                        *************
                        待完善
                        ************
                        */
                        //alert("成功退出队伍!");
                        showbox("成功退出队伍!",function()
                    {
                        //alert("成功退出!");
                    });
                        //document.getElementsByClassName("showinfor")[0].style.display="block";
                    }
                    else
                    {
                        showbox("操作失败!",function()
                    {
                        //alert("退出失败");
                    });
                    }
                 });
                
                
            });
        }
    }
    init();
    










    