var token=getCookie('token');
var username=getCookie('username');//登陆后传入
// if(token==null||username==null)
// {
//     showbox("请先登录",function()
//     {
//         // location.reload(true);       
//     })
// }
if(token!=null&&username!=null)
{
    document.getElementById("userinfor1").style.display="none";
    document.getElementById("userinfor2").style.display="block";
    document.getElementById("userinfor2").innerHTML="您好，用户:<p id='user'>"+username+'</p>';
    document.getElementById("user").style.color="red";
    document.getElementById("user").addEventListener("click",function()
    {

        //退出登录
        confirmbox("您确定退出登录么?",function()
        {
            
            if(clearp===true)
            {
                delCookie("username");
                delCookie("token");
                window.location.href="main.html";
            }
            else
            {

            }
        });
    });
}



var mybody;
var getinfor,getname;
console.log(token);

    //定义队伍信息对象
function team(name,description,id)
{
    this.name=name;
    this.description=desccription;
    this.id=id;//邀请码
}
//按此格式创建对象并以json格式存在服务器中




/*
该check函数需要补充检查内容，从后端取数据
*/
function check()//检查是否合法
{
    getname=document.getElementsByClassName("d")[0].value;
    console.log(getname);
    if(getname=='')
    {
        //showbox("名称不能为空!");
        return false;
    }
    // for(var i=0;i<mybody.length;i++)
    // {
    //     if(mybody[i]["name"]==getname)
    //     {
    //         //showbox("错误!队伍名称相同!");
    //         return false;//重名
    //     }
    // }
    //不需要判重名了
    getinfor=document.getElementsByClassName("b")[2].value;
    console.log(getinfor);
    if(getinfor=='')return false;



    //如果返回为真，则post队伍信息
    return true;
}




var bt=document.getElementById(3);
var chars="abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
bt.addEventListener("click",function(){
    //check and creat a team
    if(check()==true)//录入合法:队伍名称合法，队伍简介合法
    {
        //生成邀请码并创建队伍信息给后台
        //var json=;  创建信息并保存
        
        /*
        此处需要补充内容********************
        */
        console.log(getname);
        console.log(getinfor);
        fetch('http://58.87.111.176/api/teams',
        {
            method:'POST',
            headers:
            {
                'Content-Type':'application/json',
                'x-access-token':token
            },
            body:JSON.stringify({"name":getname,"description":getinfor})
        }).then(response=>
        {
            if(response.ok)
            {
                //返回邀请码
                return response.json();
            }
            if(response.status==409)
            {
                showbox("队伍名称冲突!请重新创建!");
            }
        },error=>
        {
            showbox("登录失效，请重新登录",function()
            {
                location.reload(true);       
            });
        }).then(res=>
        {
                var ids=res["inviteCode"];
                showbox("创建队伍成功!");
                
                var change=document.getElementById("id4");
                change.innerHTML="您的邀请码是:";
                change.style.top='6%';
                change=document.getElementsByTagName("div")[1];
                
                var newbtn='<br></br><button id=6>复&nbsp制</button>'; //追加复制按钮
                change.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;'+ids+newbtn; 
                change.style.left='6%';
                change.style.height='4%';
                change.style.width='30%';
                
                change=document.getElementById(6);
                
                change.style.left='0px';
                change.style.fontWeight='700';
                change.style.color='rgb(37, 37, 37)';
                change.style.borderRadius='20px'
                change.style.width='20%';
                change.style.height='100%';
                change.style.borderColor='aqua';
                change.style.backgroundColor= 'rgb(181, 221, 233)';

                //change.style.backgroundColor='rgb(205, 247, 247)';
                //设置按钮
                change.addEventListener("click",function()
                {
                    //复制到剪切板
                    //alert(3);
                    const input = document.createElement('input');
                    document.body.appendChild(input);
                    input.setAttribute('value', ids);
                    input.select();
                        if (document.execCommand('copy')) {
                        document.execCommand('copy');
                        console.log('复制成功');
                    }
                    document.body.removeChild(input);

                    showbox("成功复制到剪切板!");
                })


        })
    
        //貌似不用生成邀请码
        //生成邀请码
        // var idx;
        // var ids="";
        // for(var i=1;i<=26;i++)
        // {
        //     idx=Math.round(Math.random()*44);
        //     ids+=chars[idx];
        // }




        //post消息
        console.log(token);








        
        
    
    
    
    }
    else
    {
        showbox("不符合规范的队伍信息!");
        //打印创建失败
    }
})









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
    return null;
}
function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null)
document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
}
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
