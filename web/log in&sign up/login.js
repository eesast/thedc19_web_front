var userpassword=null
var username=null
var usertoken=null
var userid=null
var userinfo={
    name:username,
    password:userpassword,
}
changeuserinfo()
checkisonline()
//将用户输入信息保存在userinfo中，与服务器中数据对比
var btn=document.getElementById("submit")
btn.addEventListener("click",name_checking)
function name_checking(){
    userinfo.name=document.getElementById("username").value
    userinfo.password=document.getElementById("pwd").value
    //console.log(userinfo)
    fetch("https://thedc.eesast.com/api/auth",
    {
        method:'POST',
        headers:
        {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            {
                'username':userinfo.name,
                'password':userinfo.password
            }
        )
    }).then(response=>
    {
        //console.log(response.status)
        if(response.ok)
        {
            return response.json();
        }
        else if(response.status=='404')
        {
            showbox('该用户不存在！')
        }
        else if(response.status=='422')
        {
            showbox('用户名或密码字段不应为空！')
        }
        else if(response.status=='401')
        {
            showbox('用户名或密码错误！')
        }
        else
        {
            showbox('登录失败！')
        }
    }).then(res=>
    {
        //获取x-access-token保存至本地
        usertoken=res['token']
        userid=res['id']
        //console.log(userid)
        showbox('您已登录成功！')
        setCookie("username",userinfo.name)
        setCookie("token",usertoken)
        setCookie("userid",userid)
        changeuserinfo()
        setTimeout(() => {
            window.location.href='../newpage/firstpage.html'
        }, 6000);
        changeuserinfo()
    })
}
function setCookie(cname,cvalue){
    // var d = new Date();
    // d.setTime(d.getTime()+(exdays*24*60*60*1000));
    // var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+";path=/";
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null)
document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
}
function changeuserinfo(){
    if(getCookie("token")!="")
    {


        document.getElementById("userinfor1").style.display="none";
        document.getElementById("userinfor2").style.display="block";
        document.getElementById("userinfor2").innerHTML="您好，用户:<p id='user'><span style='cursor:pointer'>"+getCookie("username")+'</span></p>';
        document.getElementById("user").style.color="gray";
        document.getElementById("user").addEventListener("click",function()
        {

            //退出登录
            confirmbox("您确定退出登录么?",function()
            {
                
                if(clearp===true)
                {
                    delCookie("username");
                    delCookie("token");
                    delCookie("inteam");
                    delCookie("userid");
                    delCookie("iscaptain");
                    delCookie("teamid");
                    location.reload(true);
                }
                else
                {

                }
            });
        });
    }
}

function checkisonline(){
    if(getCookie("token")!="")
    {
        confirmbox("您已登录！",handle)
        function handle(){
            setTimeout(() => {
                window.location.href='../newpage/firstpage.html'
            }, 6000);
        }
    }
}

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
