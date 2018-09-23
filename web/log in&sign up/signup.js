var userpassword="unknown"
var usersname="unknown"
var useremail="unknown"
var userrealname="unknown"
var userdepartment="unknown"
var userclass="unknown"
var userphone="unknown"
var thuid="unknown"

//userinfo记录用户注册信息
changeuserinfo()
var userinfo={
    username:usersname,
    password:userpassword,
    group:"user",
    email:useremail,
    department:userdepartment,
    class:userclass,
    phone:userphone,
    realname:userrealname,
    studentId:thuid
}

//将用户输入信息保存在userinfo中，与服务器中数据对比
var btn=document.getElementById("submit")
btn.addEventListener("click",main)
function checking(){
    userinfo.username=document.getElementById("username").value
    userinfo.password=document.getElementById("pwd").value
    userinfo.email=document.getElementById("email").value
    userinfo.department=document.getElementById("department").value
    userinfo.class=document.getElementById("class").value
    userinfo.phone=document.getElementById("phone").value
    userinfo.realname=document.getElementById("realname").value
    userinfo.studentId=document.getElementById("thuid").value
    if(checkrealname(userinfo.realname)===false)
    {
        showbox("真实姓名必须为1-5个汉字！请重新输入")
        var changerealname=document.getElementById("realname")
        changerealname.value=null
        return false
    }
    if(checkphone(userinfo.phone)===false)
    {
        showbox("手机号输入不合法！请重新输入")
        var changephone=document.getElementById("phone")
        changephone.value=null
        return false
    }
    if(checkId(userinfo.studentId)===false)
    {
        showbox("学号输入不合法！请重新输入")
        var changestudentid=document.getElementById("thuid")
        changestudentid.value=null
        return false
    }
    if(checkemail(userinfo.email)===false)
    {
        showbox("邮箱输入不合法！请重新输入")
        var changeemail=document.getElementById("email")
        changeemail.value=null
        return false
    }
    return true
}

function main(){
    if(checking()===true)
    {
        senddata()
    }
}

function checkphone(obj) {
    var reg = /^\d{11}$/ ;
     if (reg.test(obj)) {
       return true
     }
     return false
   }

function checkId(obj) {
   var reg = /^\d{10}$/ ;
    if (reg.test(obj)) {
      return true
    }
    return false
  }

function checkemail(obj) {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (reg.test(obj)) {
     return true
    }
    return false
}

function checkrealname(obj) {
    var reg = /^[\u4E00-\u9FA5]{1,5}$/;
     if (reg.test(obj)) {
       return true
     }
     return false
   }

function senddata(){
    fetch("https://thedc.eesast.com/api/users",
    {
        method:'POST',
        headers:
        {
            //普通用户无需传入x-access-token
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userinfo)
    }).then(response=>
    {
        console.log(response.status)
        if(response.ok)
        {
            return response.json();
        }
        else if(response.status=='409')
        {
            showbox(response.statusText)
        }
        else if(response.status=='422')
        {
            showbox('注册表单字段不完整！')
        }
        else if(response.status=='401')
        {
            showbox('您的权限不足！')
        }
        else
        {
            showbox('注册失败！')
        }
    }).then(res=>
    {
        //获取x-access-token保存至本地
        var usertoken=res['token'];
        showbox('您已注册成功！')
        console.log(usertoken)
       // setCookie("username",userinfo.name)
        //setCookie("token",usertoken)
        window.location.href='login.html'
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
