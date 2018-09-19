var userpassword="unknown"
var username="unknown"
var useremail="unknown"
var userinfo={
    name:username,
    password:userpassword,
    email:useremail
}
var r1=false//保存用户名验证结果
//将用户输入信息保存在userinfo中，与服务器中数据对比
var btn_username=document.getElementById("btn_username")
btn_username.addEventListener("click",name_checking)
function name_checking(){
    userinfo.name=document.getElementById("text1")
    //将userinfo发送至服务器进行验证，检验是否存在此用户，取得返回结果，这里先默认返回为false
    r1=true
    return true
    /* 
    如果验证不成功
    showbox("用户名不正确！")
    r1=false
    */
}
var btn_password=document.getElementById("btn_password")
btn_password.addEventListener("click",password_checking)
function password_checking(){
    if (!r1)
    {
        showbox("您尚未进行用户名验证！")
        return false
    }
    else {
        userinfo.password = document.getElementById("text2")
        //将userinfo发送至服务器进行验证，检验用户密码是否正确，取得返回结果，这里先默认返回为false
        showbox("登录成功")
        window.location.href="https://www.eesast.com"
        return true
    }
}