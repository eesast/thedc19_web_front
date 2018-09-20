var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTM3NDI2MTgxLCJleHAiOjE1Mzc0Mjk3ODF9.11iqS0rHlcBoEWJSp8WX0Tc9bzK-ju8yFLXiwQERpJE"
var username='zrtest';//登陆后传入
var mybody='';
var inteam=false;//是否在队伍中
    function check()//检查此用户是否已经拥有队伍(创建队伍||加入队伍)
    {
        fetch("http://58.87.111.176/api/users",
        {
            method:'GET',
            headers:
            {
                'Content-Type':'application/json',
                'x-access-token':token
            }
        }).then(response=>
        {
            if(response.ok)
            {
                return response.json();
            }
        }).then(res=>
        {
            mybody=res;
            console.log(mybody);
            for(var i=0;i<mybody.length;i++)
            {
                if(mybody[i]['username']==username)
                {
                    console.log(mybody[i]['username']);
                    if(mybody[i]['team']==null)
                    {
                        inteam=false;
                    }
                    else inteam=true;
                    console.log(inteam);
                    break;
                }
                
            }
            init();
        })
       

        /*
        *******************待完善
        ************************
        // */
        //  return false;
        // return true;
    }
    check();
    function init()
    {
        //check();
        if(inteam===false)//检查已经登陆的账号是否在数据库中（是否已经有队伍）     如果没有队伍，显示创建队伍或加入队伍
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
   
    










    