var userpassword="unknown"
var username="unknown"
var useremail="unknown"

//userinfo记录用户注册信息

var userinfo={
    name:username,
    password:userpassword,
    email:useremail
}
var btn_username=document.getElementById("submit")
btn_username.addEventListener("click",setting);
function setting(){
    userinfo.name=document.getElementById("username").value
    userinfo.password=document.getElementById("pwd").value
    userinfo.email=document.getElementById("email").value
    console.log(userinfo)
    /*
    这里要发送至后端检验数据库中是否已有该用户名与密码
    有待补充
    */
    showbox("用户信息设置成功！")
}

