var userpassword="unknown"
var username="unknown"
var userinfo={
    name:username,
    password:userpassword,
}
//将用户输入信息保存在userinfo中，与服务器中数据对比
var btn=document.getElementById("submit")
btn.addEventListener("click",name_checking)
function name_checking(){
    userinfo.name=document.getElementById("username").value
    userinfo.password=document.getElementById("pwd").value
    console.log(userinfo)
    //将userinfo发送至服务器进行验证，检验是否存在此用户，取得返回结果，这里先默认返回为false
}