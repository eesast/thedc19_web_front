/*
    封装弹框系统的js
     */

    function showbox(s,callback)//打印一段话
    {
        document.getElementsByClassName("dark")[0].style.display="block";//屏幕半黑
        document.getElementsByClassName("showinfor")[0].style.display="block";//弹框
        document.getElementsByClassName("context")[0].innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;"+s;//弹出消息
        
        //设置调用按钮功能
        
        
        document.getElementsByClassName("ok")[0].addEventListener("click",function()
        {
            //按下了确认
            //优先关闭窗口
            
           
            document.getElementsByClassName("dark")[0].style.display="none";//屏幕半黑
            document.getElementsByClassName("showinfor")[0].style.display="none";//弹框
          
            if(callback && typeof(callback)==="function")
            {
                callback();
                //return true;
            }
        });


        document.getElementsByClassName("no")[0].addEventListener("click",function()
        {
            //按下了取消
            //优先关闭窗口
           
            
            document.getElementsByClassName("dark")[0].style.display="none";//屏幕半黑
            document.getElementsByClassName("showinfor")[0].style.display="none";//弹框
          
            if(callback && typeof(callback)==="function")
            {
                callback();
                //return false;
            }
        })
    }
