var userpassword="unknown"
var usersname="unknown"
var useremail="unknown"
var userrealname="unknown"
var userdepartment="unknown"
var userclass="unknown"
var userphone="unknown"
var thuid="unknown"

//userinfo记录用户注册信息

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
btn.addEventListener("click",name_checking)
function name_checking(){
    userinfo.username=document.getElementById("username").value
    userinfo.password=document.getElementById("pwd").value
    userinfo.email=document.getElementById("email").value
    userinfo.department=document.getElementById("department").value
    userinfo.class=document.getElementById("class").value
    userinfo.phone=document.getElementById("phone").value
    userinfo.realname=document.getElementById("realname").value
    userinfo.studentId=document.getElementById("thuid").value
    fetch("http://58.87.111.176/api/users",
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
        setCookie("username",userinfo.name)
        setCookie("token",usertoken)
    })
}
function setCookie(cname,cvalue){
    // var d = new Date();
    // d.setTime(d.getTime()+(exdays*24*60*60*1000));
    // var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue;
}

