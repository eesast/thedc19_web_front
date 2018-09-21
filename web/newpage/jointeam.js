var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTM3NTAxNTQ4LCJleHAiOjE1Mzc1MDUxNDh9.ME3OcxgxsrOLAz-KC6uy20t-MzKwXc_bivOVxeQbdSA"
var username='zrtest';//登陆后传入
var myusers;//使用者集合
var mobody;
    console.log(token);
fetch('http://58.87.111.176/api/auth',
{
    method:'POST',
    headers:
    {
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        'username':'admin',
        'password':'eesast-software'
    })
}).then(response=>
{
    if(response.ok)return response.json();
}).then(res=>
{
    var newtoken=res['token'];
    //alert(token);
    fetch('http://58.87.111.176/api/teams',
    {
        method:'GET',
        headers:
        {
            'Content-Type':'application/json',
            'x-access-token':newtoken.toString()},//以管理员权限访问所有队伍信息
    }).then(response=>
    {
        if(response.ok)
        {
            return response.json();
        }
        else{
            console.log(response.status);
        }
    },error=>
    {
        //alert(response);
        //alert("网页错误");
    }).then(res=>
    {
        console.log(res);
        mybody=res;//获取所有队伍信息，包括邀请码
        console.log(mybody[0]);
        console.log(mybody.length);//获取长度

        fetch('http://58.87.111.176/api/users',
        {
            method:'GET',
            headers:
            {
                'Content-Type':'application/json',
                'x-access-token':token.toString()},
        }).then(response=>
        {
            if(response.ok)
            {
                return response.json();
            }
            else{
                console.log(response.status);
            }
                    
       
        }).then(res=>
        {
            myusers=res;
            init();//打印队伍信息
            setjoin();//设置一键加入
        })
        
    })
})
    



var data;
function init()//初始化，从服务器读取已有队伍信息并显示
    {
        var input;
        var change=document.getElementsByClassName("c")[0];
        var line="";
        data=new Array(mybody.length);
        line+="<tr><th>队伍名称</th><th>队长</th><th>简介</th><th>队伍人数</th><th>立即加入</th></tr><tbody>";
        function team(name,description,id,captain,members,invitecode)
        {
            this.name=name;
            this.description=description;
            this.id=id;
            this.captain=captain;
            this.members=members;
            this.invitecode=invitecode;
        }
        var count=0;//记录队伍总数
        
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
           // window.alert(data[i].name);
            // line+='队伍ID:'+input.id;
            line+='<td>'+input.name+'</td>';
            for(var j=0;j<myusers.length;j++)
            {
                if(myusers[j]['id']==input.captain)
                {
                    line+='<td>'+myusers[j]['username']+'</td>';
                    break;
                }
                
            }
            line+='<td><div class="more">'+input.description+'</div></td>';
        
            line+='<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+input.members+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
        
            line+="<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;<button>加入队伍</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
            line+='</tr>';

            count++;
        }
        // for(var i=0;i<=mybody.length;i++)
        // {
        //     var turn=document.getElementsByTagName("tr")[i];

        // }
        //document.getElementsByClassName("ts-footer")[0].style.top=(300+count*70)+'px';
        
        
        change.innerHTML=line;
        for(var i=0;i<mybody.length;i++)
        {
            var turn=document.getElementsByClassName("more")[i];
            turn.style.width="750px";
            turn.style.height="60px";
            turn.style.wordBreak="break-all";
            turn.style.overflow="scroll";
            turn.style.overflowX="hidden";

            
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
        
        for(var i=1;i<=count;i++)
        {
            
            //setclickinfor(i);
            setclickjoin(i);
        }

        // function setclickinfor(i)
        // {
        //     var change=document.getElementsByTagName("button")[i*2-1];
        //     //window.alert(i);
        //     change.style.color='green';
        //     change.addEventListener("click",function()
        //     {
        //         // showbox("22222222222222222222222222222222222222222222222222222222222")
        //         showbox('队伍名称:'+data[i].name+'&nbsp;&nbsp;'+'队伍人数:'+data[i].members+'&nbsp;&nbsp;队伍简介:'+data[i].description);
        //     })
        // }

        function setclickjoin(i)//设置如下
        {
            var change=document.getElementsByTagName("button")[i];
            //window.alert(i);
            change.style.color='rgb(57, 83, 17)';
            change.addEventListener("click",()=>
            {
                //alert('队伍名称:'+data[i].name+'\n'+'队伍简介:'+data[i].description);
               // var idnum=document.getElementById("name").value;//获取文本框内邀请码
                //window.alert(2);
                inputbox("请输入邀请码",function()
                {
                    var idnum=document.getElementsByClassName("setinput")[0].value;
                    //alert(idnum);
                    if(check(idnum,i)===true)
                    {
                        //报名加入信息
                        /*
                        ****************
                        该处更新保存数据
                        待完善
                        */
                        showbox("加入队伍成功",function()
                        {
                            window.location.href='main.html';
                        });
                        //返回初始界面

                        
                    }
                    else
                    {
                        showbox("邀请码错误，请重新检查!");
                    }
                });
                //while(setinputflag===false)window.sleep(100);
                //alert(1);
                
                //window.alert(idnum);
                
                
            })
        }
        


        
    }
    
        function check(idnum,i)//与服务器数据中的邀请码进行匹配  idnum是邀请码  i是与第几个队伍比较（为0则放弃比较）
        {
            if(i==0)
            {
                for(var j=0;j<mybody.length;j++)
                {
                    console.log(idnum);
                    if(idnum==mybody[j]['inviteCode'])
                    {
                        //发送更新消息
                        fetch("http://58.87.111.176/api/teams/"+mybody[j]['id']+'/members?inviteCode='+idnum,
                        {
                            method:'POST',
                            headers:
                            {
                                'Content-Type':'application/json',
                                'x-access-token':token.toString(),
                            },
                            
                        }).then(response=>
                        {
                        })
                        return true;
                        
                    }
                }
            }
            else if(idnum==data[i].invitecode)
            {
                //发送更新消息
                fetch("http://58.87.111.176/api/teams/"+data[i]['id']+'/members?inviteCode='+idnum,
                {
                    method:'POST',
                    headers:
                    {
                        'Content-Type':'application/json',
                        'x-access-token':token.toString(),
                    },
                    
                }).then(response=>
                {
                })

                return true;
            }
            
            //else
            return false;
        }

   

    //设置立即加入队伍（利用邀请码）
     function setjoin()
     {
         document.getElementById("name").value="";
         var change=document.getElementsByClassName("b")[0];//立即加入按钮
         document.getElementById("name").focus();//默认焦点在邀请码输入框

         //回车事件监听
         document.addEventListener("keydown",handdle);         
         function handdle(e) {
        
            //捕捉回车事件
            var ev =e.keyCode;
        
            if(ev == 13 && document.activeElement === document.getElementById("name")) {

                change.click();//按下回车，等同于按键触发"立即加入" 
                document.getElementById("name").focus();//返还焦点  否则弹框一闪而过
                
            }
            
         }

         change.addEventListener("click",function()
        {
            var idnum=document.getElementById("name").value;
            console.log(idnum);
            // document.getElementById("name").focus();
            /*
            ****和服务器内存有的邀请码进行匹配，查看是否符合条件
            */
       
            if(check(idnum,0)==true)
            {
                //报名加入信息
                /*
                ****************
                该处更新保存数据
                待完善
                */
                showbox("加入队伍成功",function()
                {
                    window.location.href='main.html';
                });
                //返回初始界面

               // window.location.href='main.html';
            }
            else
            {
                showbox("邀请码错误，请重新检查!",function()
                {
                    location=location;         
                });
            }
            
            
           // document.getElementById("name").focus();
        })
     }
    