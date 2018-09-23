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
    fetch("https://thedc20.eesast.com/api/users",
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
        window.location.href='login.html'
    })
}

function setCookie(cname,cvalue){
    // var d = new Date();
    // d.setTime(d.getTime()+(exdays*24*60*60*1000));
    // var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+";path=/";
}
