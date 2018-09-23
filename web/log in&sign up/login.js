var userpassword=null
var username=null
var usertoken=null
var userid=null
var userinfo={
    name:username,
    password:userpassword,
}
changeuserinfo()
//将用户输入信息保存在userinfo中，与服务器中数据对比
var btn=document.getElementById("submit")
btn.addEventListener("click",name_checking)
function name_checking(){
    userinfo.name=document.getElementById("username").value
    userinfo.password=document.getElementById("pwd").value
    //console.log(userinfo)
    fetch("https://thedc20.eesast.com/api/auth",
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
        console.log(response.status)
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
        console.log(userid)
        showbox('您已登录成功！')
        setCookie("username",userinfo.name)
        setCookie("token",usertoken)
        setCookie("userid",userid)
        changeuserinfo()
        /*setTimeout(() => {
            window.location.href='../newpage/firstpage.html'
        }, 5000);*/
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
