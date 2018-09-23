function getOs()   
{   
    var OsObject = "";   
    if(navigator.userAgent.indexOf("MSIE")>0) {   
         return "MSIE";   
    }   
    if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){   
         return "Firefox";   
    }   
    if(isSafari=navigator.userAgent.indexOf("Safari")>0) {   
         return "Safari";   
    }    
    if(isCamino=navigator.userAgent.indexOf("Camino")>0){   
         return "Camino";   
    }   
    if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){   
         return "Gecko";   
    }   
}   
/*
check browser
*/
    
    
    
    /*
    封装弹框系统的js
     */

    /*
    s为打印的文本内容，callback是回调函数（执行相应内容) setinputflag为true时加入input框 
    */ 
    function showbox(s,callback)//打印一段话
    {
        document.getElementsByClassName("dark")[0].style.display="block";//屏幕半黑
        document.getElementsByClassName("showinfor")[0].style.display="block";//弹框
        document.getElementsByClassName("context")[0].innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;"+s;//弹出消息
        document.getElementsByClassName("ok")[0].style.left="46.5%";
        //设置调用按钮功能
        document.getElementsByClassName("ok")[0].focus();
        document.addEventListener("keydown",handdle);
        function handdle(e) {
           
            //捕捉回车事件
            var ev =e.keyCode;//event || window.event || arguments.callee.caller.arguments[0];
            //alert(ev.keyCode);
            if(ev == 13) 
            {   
                 document.removeEventListener("keydown",handdle);
                
                document.getElementsByClassName("ok")[0].click();
               
             }
             
        }

        document.getElementsByClassName("ok")[0].addEventListener("click",function()
        {
            //按下了确认
            //优先关闭窗口
            
            //document.getElementsByClassName("ok")[0].target.blur();
            document.getElementsByClassName("dark")[0].style.display="none";//屏幕半黑
            document.getElementsByClassName("showinfor")[0].style.display="none";//弹框
          
            if(callback && typeof(callback)==="function")
            {
                callback();
               
            }
           
        });
    }

    
/*
使用样例:(可以加回调)
    showbox("你好!");
*/


//************************************************************* */
    /*
    封装带输入框和返回值函数
     */
  
    function inputbox(s,callback)
    {
        document.getElementsByClassName("dark")[1].style.display="block";//屏幕半黑
        document.getElementsByClassName("showinfor")[1].style.display="block";//弹框
        document.getElementsByClassName("context")[1].innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;"+s;//弹出消息
        document.getElementsByClassName("setinput")[0].value="";
        //设置调用按钮功能
        
        document.getElementsByClassName("setinput")[0].focus();
        // if(document.addEventListener)alert("ok");
        document.addEventListener("keydown",handdle);
        function handdle(e) {
           
            
            //捕捉回车事件
            var ev =e.keyCode;//event || window.event || arguments.callee.caller.arguments[0];
            //alert(ev.keyCode);
            if(ev == 13) {
                document.removeEventListener("keydown",handdle);
                
                // document.getElementsByClassName("ok")[1].click();
                document.getElementsByClassName("ok")[1].focus();
             }
             
        }

        document.getElementsByClassName("ok")[1].addEventListener("click",function()
        {
            //按下了确认
            //优先关闭窗口
            
           
            document.getElementsByClassName("dark")[1].style.display="none";//屏幕半黑
            document.getElementsByClassName("showinfor")[1].style.display="none";//弹框
            
            if(callback && typeof(callback)==="function")
            {
                callback();
                
            }
         
        });


        document.getElementsByClassName("no")[0].addEventListener("click",function()
        {
            //按下了取消
            //优先关闭窗口
         
            document.getElementsByClassName("dark")[1].style.display="none";//屏幕半黑
            document.getElementsByClassName("showinfor")[1].style.display="none";//弹框
          
            // if(callback && typeof(callback)==="function")
            // {
            //     callback();
               
            // }

          
        })
 
    }

/**
 * 使用样例:
    inputbox("如果确认退出队伍，请输入:Exit",function()
    {
    var makeconfirm=document.getElementsByClassName("setinput")[0].value;
    if(makeconfirm==="Exit")
    {
        //删除队伍信息
   
        showbox("成功退出队伍!");
        
    }
    else
    {
        showbox("操作失败!");
    }
    });
 */





    //************************************************************************* */

    /*

    以下为确认信息的函数，模拟confirm
     */

    var clearp=false;//单击事件确认

    function confirmbox(s,callback)//打印一段话
    {
        clearp=false;//单击事件标记复位

        document.getElementsByClassName("dark")[2].style.display="block";//屏幕半黑
        document.getElementsByClassName("showinfor")[2].style.display="block";//弹框
        document.getElementsByClassName("context")[2].innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;"+s;//弹出消息
        //document.getElementsByClassName("ok")[0].style.left="46.5%";
        //设置调用按钮功能
        
        document.getElementsByClassName("ok")[2].focus();
        // document.addEventListener("keydown",handdle);
        // function handdle(e) {
           
        //     //捕捉回车事件
        //     var ev =e.keyCode;//event || window.event || arguments.callee.caller.arguments[0];
        //     //alert(ev.keyCode);
        //     if(ev == 13) 
        //     {
        //         document.removeEventListener("keydown",handdle);
                
        //         document.getElementsByClassName("ok")[2].click();
               
        //      }
             
        // }

        document.getElementsByClassName("ok")[2].addEventListener("click",function()
        {
            //按下了确认
            //优先关闭窗口
            
            clearp=true;//单击确认键
           
            document.getElementsByClassName("dark")[2].style.display="none";//屏幕半黑
            document.getElementsByClassName("showinfor")[2].style.display="none";//弹框
          
            if(callback && typeof(callback)==="function")
            {
                callback();
                //return true;
            }
            //window.location.href='main.html';//刷新界面
        });


        document.getElementsByClassName("no")[1].addEventListener("click",function()
        {
            //按下了取消
            //优先关闭窗口
           
            clearp=false;//单击取消键
            
            document.getElementsByClassName("dark")[2].style.display="none";//屏幕半黑
            document.getElementsByClassName("showinfor")[2].style.display="none";//弹框
          
            // if(callback && typeof(callback)==="function")
            // {
            //     callback();
            //     //return false;
            // }
            //window.location.href='main.html';//刷新界面
        })
    }

    /*
    使用样例:
    fbt.addEventListener("click",function()
    {
        //踢出队伍
        
        confirmbox("您确定要踢出该队员么?",function()
        {
            
            if(clearp===true)
            {
               
                showbox("该队员已被踢出队伍!");
              
            }
            else
            {
                showbox("取消操作!");
            }
        });
       
        
    })
     */