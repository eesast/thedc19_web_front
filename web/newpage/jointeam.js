var token=''
var mobody;
fetch('http://58.87.111.176/api/auth',
{
    method:'POST',
    credentials: 'include',
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
    if(response.ok)
    {
        return response.json();
    }
},error=>
{
    alert("no big")
}).then(res=>
{

    console.log(res);
    token=res['token'];
    console.log(token);
    //alert(token);
    fetch('http://58.87.111.176/api/teams',
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
    },error=>
    {
        //alert(response);
        alert("网页错误");
    }).then(res=>
    {
        console.log(res);
        mybody=res;
        console.log(mybody[0]);
        console.log(mybody.length);//获取长度
        init();
        setjoin();
    })
})


var data;
function init()//初始化，从服务器读取已有队伍信息并显示
    {
        var input;
        var change=document.getElementsByTagName("div")[2];
        var line="";
        data=new Array(mybody.length);
        
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
            input={name:" "+mybody[i-1]['name'],description:mybody[i-1]['description'],id:mybody[i-1]['id'],captain:mybody[i-1]['captain'],members:mybody[i-1]['members'].length,invitecode:mybody[i-1]['inviteCode']};//****************************
            
          
            data[i]=new team(input.name,input.description,input.id,input.captain,input.members,input.invitecode);
           // window.alert(data[i].name);
            line+='队伍ID:'+input.id;
            line+="       队伍名称:";
            line+=input.name;
            line+='      队长:'+input.captain;
            for(var j=1;j<=20;j++)line+=("&nbsp");
            line+="<button>查看信息</button><button>加入队伍</button>";
            line+='<br></br>';

            count++;
        }
        
        //document.getElementsByClassName("ts-footer")[0].style.top=(300+count*70)+'px';
        
        
        change.innerHTML=line;
     
        //设置查看各项队伍信息
        
        for(var i=1;i<=count;i++)
        {
            
            setclickinfor(i);
            setclickjoin(i);
        }

        function setclickinfor(i)
        {
            var change=document.getElementsByTagName("button")[i*2-1];
            //window.alert(i);
            change.style.color='green';
            change.addEventListener("click",function()
            {
                // showbox("22222222222222222222222222222222222222222222222222222222222")
                showbox('队伍名称:'+data[i].name+'&nbsp;&nbsp;'+'队伍人数:'+data[i].members+'&nbsp;&nbsp;队伍简介:'+data[i].description);
            })
        }

        function setclickjoin(i)//设置如下
        {
            var change=document.getElementsByTagName("button")[i*2];
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
                        showbox("加入队伍成功");
                        //返回初始界面

                        //window.location.href='main.html';
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
                    console.log(mybody[j]);
                    if(idnum==mybody[j]['inviteCode'])
                    {
                        //发送更新消息
                        return true;
                        
                    }
                }
            }
            else if(idnum==data[i].invitecode)
            {
                //发送更新消息
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
                    location=location; 
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
    