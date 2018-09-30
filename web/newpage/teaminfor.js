var mybody;//队伍集合
var myusers;//使用者集合
var token=getCookie('token');
var username=getCookie('username');//登陆后传入
if(token==null||username==null)
{
    showbox("请先登录",function()
    {
         window.location.href='main.html';       
    })
}
if(token!=null&&username!=null)
{
    document.getElementById("userinfor1").style.display="none";
    document.getElementById("userinfor2").style.display="block";
    document.getElementById("userinfor2").innerHTML="您好，用户:<p id='user'><span style='cursor:pointer'>"+username+'</span></p>';
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
                window.location.href="main.html";
            }
            else
            {

            }
        });
    });
}


var iscaptain=getCookie("iscaptain");
var teamid=getCookie("teamid");//获得teamid，然后用mybody[]显示
var userid=getCookie("userid");
    //console.log(token);
    //console.log(iscaptain);
    fetch('https://thedc.eesast.com/api/teams',
    {
        method:'GET',
        headers:
        {
            'Content-Type':'application/json',
            'x-access-token':token.toString()},
    }).then(response=>
    {
        if(response.status==401)
        {
            
            showbox("登陆已失效，请重新登录",function()
            {
                window.location.href="../log in&sign up/login.html";
            });
            document.getElementById("userinfor2").style.display="none";
            document.getElementById("userinfor1").style.display="block";
        }
        if(response.ok)
        {
            return response.json();
        }
        else{
            //console.log(response.status);
        }
    },error=>
    {
        showbox("登录失效，请重新登录",function()
        {
            window.location.href='main.html';       
        });
    }).then(res=>
    {
        mybody=res;
        fetch('https://thedc.eesast.com/api/users',
        {
            method:'GET',
            headers:
            {
                'Content-Type':'application/json',
                'x-access-token':token.toString()},
        }).then(response=>
        {
            if(response.status==401)
            {
                showbox("登陆已失效，请重新登录",function()
                {
                    window.location.href="../log in&sign up/login.html";
                });
                document.getElementById("userinfor2").style.display="none";
                document.getElementById("userinfor1").style.display="block";
            }
            if(response.ok)
            {
                return response.json();
            }
            else{
                //console.log(response.status);
            }
                    
       
        },error=>
        {
                showbox("登录失效，请重新登录",function()
                {
                    window.location.href='main.html';       
                });
        }).then(res=>
        {
            myusers=res;
            showteaminfor();
            init();
        })
    }) 


// function check()
// {
//     //如果是队长
//     if(iscaptain==true)return true;
//     else return false;
// }
                    
var bas=0;//bas为button偏移量
var count=0;//记录队伍总数
//****************************************该函数同jointeam.html，修改其中一个后基本可以直接使用
function init()//初始化，从服务器读取已有队伍信息并显示
{
    

    var input;
    var change=document.getElementsByClassName("d")[0];
    var line="";
    var data=new Array(mybody.length);
    
    function team(name,description,id,captain,members,invitecode)
    {
        this.name=name;
        this.description=description;
        this.id=id;
        this.captain=captain;
        this.members=members;
        this.invitecode=invitecode;
    }
    
    line+="<tr><th>队伍名称</th><th>队长</th><th colspan='6'>简介</th><th>队伍人数</th><th>队伍成员</th></tr><tbody>";
    for(var i=1;i<=mybody.length;i++)
    {
        /*
        *****************
        修改input从服务器读取已经有的队伍信息
        *****************
        */
       line+='<tr>';
        input={name:" "+mybody[i-1]['name'],description:mybody[i-1]['description'],id:mybody[i-1]['id'],captain:mybody[i-1]['captain'],members:mybody[i-1]['members'].length,invitecode:mybody[i-1]['inviteCode']};//****************************


        data[i]=new team(input.name,input.description,input.id,input.captain,input.members,input.invitecode);
        //line+="&nbsp;&nbsp;&nbsp;&nbsp;";
        line+="<th>"+input.name+'</th>';
        for(var j=0;j<myusers.length;j++)
        {
            if(myusers[j]['id']==input.captain)
            {
                line+='<th>'+myusers[j]['username']+'</th>';
                break;
            }
            
        }
        line+='<td colspan="6"><div class="more" style="word-wrap:break-word">'+input.description+'</div></td>';
        //for(var j=1;j<=20;j++)line+=("&nbsp");
        //line+="<button>查看信息</button>";
        //line+='<br><hr>';
        line+='<th>'+input.members+'</th>';
        line+='<th>'
            var membercnt=false;//一个标记
            for(var k=0;k<myusers.length;k++)
            {
                if(myusers[k]['team']==null)continue;
                if(myusers[k]['team']['id']===input.id)//在队伍
                {
                    if(myusers[k]['id']!==input.captain)//不是队长
                    {
                        if(membercnt===true)
                        {
                            line+='<hr>';
                        }
                        else
                        {
                            membercnt=true;
                        }
                        if(myusers[k]['id']==userid)line+='<span style="color:red;">';//是使用者
                        line+=myusers[k]['username'];
                        if(myusers[k]['id']==userid)line+='</span>';//是使用者
                    }
                }
            }
            line+='</th>'

        count++;
        line+='</tr>'
        
    }
    line+="</tbody>"
    

// document.getElementsByClassName("ts-footer")[0].style.top=(400+count*70)+'px';
    
    
    change.innerHTML=line;
    for(var i=0;i<mybody.length;i++)
    {
         var turn=document.getElementsByClassName("more")[i];
        // turn.style.width="500px";
        // turn.style.height="60px";
        // turn.style.wordBreak="break-all";
        // turn.style.whitespace="normal";
        turn.style.overflow="auto";
        // turn.style.overflowX="hidden";

        
    }
    for(var i=0;i<=mybody.length;i++)
    {
        var turn=document.getElementsByTagName("tr")[i];
        if(i%2==1)
        {
            turn.style.backgroundColor="rgb(219, 238, 245)";
        }
        else
        {
            turn.style.backgroundColor="rgb(220, 232, 236)";
        }
    }
  
    //设置查看各项队伍信息
    
    // for(var i=0;i<count;i++)
    // {
        
    //     setclick(i);//bas为偏移量
    // }

    // function setclick(i)
    // {
    //     var change=document.getElementsByTagName("button")[i+bas];
    //     //window.alert(i);
    //     change.style.color='red';
    //     change.style.float='right';
    //     change.addEventListener("click",()=>
    //     {
    //         showbox('队伍名称:'+data[i+1].name+'&nbsp;&nbsp;'+'队伍人数:'+data[i+1].members+'&nbsp;&nbsp;队伍简介:'+data[i+1].description);
    //     })
    // }
}




/*
*********************************此段开始为显示队伍信息
*/
//构造一个对象
function teaminfor(name,description,leader,cnt,member,invitecode)
{
    this.name=name;
    this.description=description;
    this.leader=leader;
    this.cnt=cnt;
    this.member=member;
    this.invitecode=invitecode;
}
//var member=["gank","tank"];


var team;

function showteaminfor()
{
    //console.log(teamid);
    //console.log(myusers);
    
    for(var i=0;i<mybody.length;i++)
    {
        if(mybody[i]['id']==teamid)
        {
            team={name:mybody[i]['name'],description:mybody[i]['description'],leader:mybody[i]['captain'],cnt:mybody[i]['members'].length,member:mybody[i]['members'],invitecode:mybody[i]['inviteCode']};
            break;
        }
    }
    //console.log(team);
    //console.log(iscaptain);
    //console.log(team.member);
    if(iscaptain=='true')//如果是队长
    {
        bas=team.cnt;//偏移量
        

        var change=document.getElementsByClassName("a")[0];//队长中向class a加入元素
        var line="";
        

        line+="<h3>&nbsp;&nbsp;&nbsp;&nbsp;队名";
        for(var i=1;i<=25;i++)line+="&nbsp";
        line+=team.name+'<br><hr>';
        //以上为第1行
        
        line+="&nbsp;&nbsp;&nbsp;&nbsp;简介<br><hr>";
        line+="<div class='description'style='word-wrap:break-word'>&nbsp;&nbsp;&nbsp;&nbsp;"+team.description+'</div><br><hr>';
        //document.getElementsByClassName("description")[0].style.overflow="scroll";
        //以上为第2行
        line+="&nbsp;&nbsp;&nbsp;&nbsp;邀请码";
        for(var i=1;i<=20;i++)line+="&nbsp";
        line+=team.invitecode+'<button id="copyx">复制</button><br><hr>';
        line+="&nbsp;&nbsp;&nbsp;&nbsp;队长";
        for(var i=1;i<=23;i++)line+="&nbsp";
        for(var i=0;i<myusers.length;i++)
        {
            //console.log(team.leader);
            if(myusers[i]['id']==team.leader)
            {
                line+='<span style="color:red;">'+myusers[i]['username']+'</span><br><hr>';
                //console.log(myusers[i]['username']);
                break;
            }
            
        }
        //以上为第3行

        line+="&nbsp;&nbsp;&nbsp;&nbsp;成员数量";
        for(var i=1;i<=16;i++)line+="&nbsp";
        line+=team.cnt+'<br><hr>';
        //以上为第4行

        line+="&nbsp;&nbsp;&nbsp;&nbsp;成员<br><hr></h3>";
        for(var i=0;i<team.cnt;i++)
        {
            if(team.member[i]==team.leader)continue;
            //console.log(team.member[i]);
            for(var j=0;j<myusers.length;j++)
            {
                if(myusers[j]['id']==team.member[i])
                {
                   line+="<p>&nbsp;&nbsp;&nbsp;&nbsp;"+myusers[j]['username']+"</p>";
                    break;
                }
               
            }
            //alert(team.member[i].length);
            //for(var j=0;j<20-team.member[i].length;j++)line+='&nbsp';
            line+="<button>踢出队伍</button><br><hr>";
        }
        //以上为第5行


        line+="&nbsp;&nbsp;&nbsp;&nbsp;<button>解散队伍</button>";
        //以上为最终行
        
        change.innerHTML=line;
        
        change=document.getElementsByClassName("description")[0];
        change.style.overflow="scroll";
        change.style.overflowX="hidden";
        change.style.wordBreak="break-all";
        change.style.height="20%";
        change.style.width="100%";
        
        for(var i=0;i<team.cnt-1;i++)//第一个队伍人员应该是队长
        {
            //if(team.member[i]==team.leader)continue;
            var fbt=document.getElementsByTagName("button")[i+1];
            var fp=document.getElementsByTagName("p")[i];
            //fbt.style.position="absolute";
            fp.style.display="inline";
            fbt.style.display="inline";
            fbt.style.float='right';
            setdropsb(i+1);
            
        }
    var st= document.getElementsByTagName("button")[team.cnt];
    st.addEventListener("click",function()
    {
        //解散队伍
        inputbox("您确认要解散该队伍么?确认请输入:Clear",function()
        {
                var cleart=document.getElementsByClassName("setinput")[0].value;
                if(cleart==="Clear")
                {
                    //解散该队伍，然后回到首页
                    /*
                    *****************
                    具体操作待完善
                    *****************
                    */
                    dissolve(function()
                    {
                        showbox("成功解散队伍!",function()
                        {
                            //点击后刷新页面
                            window.location.href='main.html';   
                            window.location.href="main.html";//回到主页面
                        });
                    });
                    //
                }
                else
                {
                    showbox("无效的操作!");
                }
        });
        
    })  
    }
    else //如果是队员
    {
        bas=1;//设置偏移量为1


        var change=document.getElementsByClassName("a")[0];
        change.style.display="none";//隐藏class a
        change=document.getElementsByClassName("b")[0];//队员中向class b加入元素
        change.style.display="block";//启动class b
        var line="";
        

        line+="<h3>&nbsp;&nbsp;&nbsp;&nbsp;队名";
        for(var i=1;i<=25;i++)line+="&nbsp";
        line+=team.name+'<br><hr>';
        //以上为第1行
        
        line+="&nbsp;&nbsp;&nbsp;&nbsp;简介<br><hr>";
        line+='<div class="description" style="word-wrap:break-word">&nbsp;&nbsp;&nbsp;&nbsp;'+team.description+'</div><br><hr>';
        //以上为第2行
        line+="&nbsp;&nbsp;&nbsp;&nbsp;邀请码";
        for(var i=1;i<=20;i++)line+="&nbsp";
        line+=team.invitecode+'<button id="copyx">复制</button><br><hr>';
        line+="&nbsp;&nbsp;&nbsp;&nbsp;队长";
        for(var i=1;i<=23;i++)line+="&nbsp";
        for(var i=0;i<myusers.length;i++)
        {
            //console.log(team.leader);
            if(myusers[i]['id']==team.leader)
            {
                line+=myusers[i]['username']+'<br><hr>';
                //console.log(myusers[i]['username']);
                break;
            }
            
        }
        // line+=team.leader+'<br><hr>';
        //以上为第3行

        line+="&nbsp;&nbsp;&nbsp;&nbsp;成员数量";
        for(var i=1;i<=16;i++)line+="&nbsp";
        line+=team.cnt+'<br><hr>';
        //以上为第4行

        line+="&nbsp;&nbsp;&nbsp;&nbsp;成员<br><hr></h3>";
        for(var i=0;i<team.cnt;i++)
        {
            if(team.member[i]==team.leader)continue;
            for(var j=0;j<myusers.length;j++)
            {
                if(myusers[j]['id']==team.member[i])
                {
                    // console.log('@@'+myusers[j]['id']);
                    // console.log('##'+userid);
                    if(myusers[j]['id']==userid)line+="<p style='color:red;'>&nbsp;&nbsp;&nbsp;&nbsp;"+myusers[j]['username']+"</p>";
                    else line+="<p>&nbsp;&nbsp;&nbsp;&nbsp;"+myusers[j]['username']+"</p>";
                    break;
                }
               
            }
            // line+="<p>&nbsp;&nbsp;&nbsp;&nbsp;"+team.member[i]+"<hr></p>";
            
        }
        //以上为第5行


        line+="&nbsp;&nbsp;&nbsp;&nbsp;<button>退出队伍</button>";
        //以上为最终行
        
        change.innerHTML=line;
        change=document.getElementsByClassName("description")[0];
        change.style.overflow="scroll";
        change.style.overflowX="hidden";
        change.style.wordBreak="break-all";
        change.style.height="20%";
        change.style.width="100%";
        
        
        var fbt=document.getElementsByTagName("button")[1];
        fbt.addEventListener("click",function()
        {
            inputbox("您确认要退出队伍?确认请输入:Exit",function()
            {
                var ex=document.getElementsByClassName("setinput")[0].value;
                if(ex==="Exit")
                {
                    /*
                    ************
                    删除队伍信息，待完善
                    ************
                    */
                   letitgo(function()
                    {
                        showbox("成功退出队伍!",function()
                        {
                            //点击后刷新页面
                            window.location.href="main.html";//回到主页面
                            // window.location.href='main.html';   
                        });
                    });
                    //showbox("成功退出队伍!");
                    
                }
                else
                {
                    showbox("操作失败!");
                }
            });
            
        })
    }

    var change=document.getElementById("copyx");
    change.addEventListener("click",function()
    {
        //复制到剪切板
        //alert(3);
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value',team.invitecode);
        input.select();
            if (document.execCommand('copy')) {
            document.execCommand('copy');
            //console.log('复制成功');
        }
        document.body.removeChild(input);

        showbox("成功复制到剪切板!");
    })
}
function setdropsb(i)
{
    var fbt=document.getElementsByTagName("button")[i];
    fbt.addEventListener("click",function()
            {
                //踢出队伍
                
                confirmbox("您确定要踢出该队员么?",function()
                {
                    
                    if(clearp===true)
                    {
                        /*
                        ***********************
                        具体操作待完善
                        ***********************
                        删除，从数据库的队伍信息中删除该队员
                        */
                       //console.log(team.member[i+1]);
                        dropsb(team.member[i+1],function()
                        {
                            showbox("该队员已被踢出队伍!",function()
                            {
                                //点击后刷新页面
                                window.location.href='main.html';   
                
                            });
                        });//踢掉第i个人
                        //showbox("该队员已被踢出队伍!");
                        //然后刷新网页
                        //window.location.href="teaminfor.html";
                    }
                    else
                    {
                        showbox("取消操作!");
                    }
                });
                //alert(1);
                
            })
}

function dissolve(callback)
{
    
        //得到新的token，删除id的队伍 teamid
        //console.log(teamid);
        fetch("https://thedc.eesast.com/api/teams/"+teamid,
        {
            method:'DELETE',
            headers:
            {
                'Content-Type':'application/json',
                'x-access-token':token.toString()
            }
        }).then(response=>
        {
            if(response.status==401)
            {
                showbox("登陆已失效，请重新登录",function()
                {
                    window.location.href="../log in&sign up/login.html";
                });
                document.getElementById("userinfor2").style.display="none";
                document.getElementById("userinfor1").style.display="block";
            }
            if(response.status==504)
            {
                
                showbox("请求超时!",function()
                {
                    location=location;  
                });
            }
            if(response.ok===true)
            {
                if(callback&&typeof(callback)==="function")
                {
                    callback();
                }
            }
        },error=>
        {
            showbox("您没有权限!",function()
            {
                location=location;  
            });
        })
    

    
}


function letitgo(callback)
{
    
        //console.log(teamid);
        fetch("https://thedc.eesast.com/api/teams/"+teamid+"/members/"+userid,
        {
            method:'DELETE',
            headers:
            {
                'Content-Type':'application/json',
                'x-access-token':token.toString()
            }
        }).then(response=>
        {
            if(response.status==401)
            {
                showbox("登陆已失效，请重新登录",function()
                {
                    window.location.href="../log in&sign up/login.html";
                });
                document.getElementById("userinfor2").style.display="none";
                document.getElementById("userinfor1").style.display="block";
            }
            if(response.ok===true)
            {
                if(callback&&typeof(callback)==="function")
                {
                    callback();
                }
            }
        },error=>
        {
            showbox("登录失效，请重新登录",function()
            {
                window.location.href='main.html';       
            });
        })

    
    // if(callback&&typeof(callback)==="function")
    // {
    //     callback();
    // }
}


function dropsb(dropsbid,callback)
{
    
        //console.log(dropsbid);
        fetch("https://thedc.eesast.com/api/teams/"+teamid+"/members/"+dropsbid,
        {
            method:'DELETE',
            headers:
            {
                'Content-Type':'application/json',
                'x-access-token':token.toString()
            }
        }).then(response=>
        {
            if(response.status==401)
            {
                showbox("登陆已失效，请重新登录",function()
                {
                    window.location.href="../log in&sign up/login.html";
                });
                document.getElementById("userinfor2").style.display="none";
                document.getElementById("userinfor1").style.display="block";
            }
            if(response.ok===true)
            {
                if(callback&&typeof(callback)==="function")
                {
                    callback();
                }
            }
        },error=>
        {
            showbox("登录失效，请重新登录",function()
            {
                window.location.href='main.html';       
            });
        })

    
    // if(callback&&typeof(callback)==="function")
    // {
    //     callback();
    // }
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
