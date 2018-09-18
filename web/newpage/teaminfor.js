var mybody;
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
                     mybody=res;

                    function check()
                    {
                        /*
                        ********************待完善
                        修改team信息
                        */
                        //如果是队长
                        return true;
                        return false;
                    }
                    
                    var bas=0;//bas为button偏移量
                    var count=0;//记录队伍总数
                    //****************************************该函数同jointeam.html，修改其中一个后基本可以直接使用
                    function init()//初始化，从服务器读取已有队伍信息并显示
                    {
                        

                        var input;
                        var change=document.getElementsByTagName("div")[4];
                        var line="<br><br><hr>";
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
                        
                        
                        for(var i=1;i<=mybody.length;i++)
                        {
                            /*
                            *****************
                            修改input从服务器读取已经有的队伍信息
                            *****************
                            */
                            input={name:" "+mybody[i-1]['name'],description:mybody[i-1]['description'],id:mybody[i-1]['id'],captain:mybody[i-1]['captain'],members:mybody[i-1]['members'].length,invitecode:mybody[i-1]['inviteCode']};//****************************
            
          
                            data[i]=new team(input.name,input.description,input.id,input.captain,input.members,input.invitecode);
                            line+="&nbsp;&nbsp;&nbsp;&nbsp;"+'队伍ID:'+input.id+"&nbsp;&nbsp;&nbsp;&nbsp;队伍名称:";
                            line+=input.name;
                            line+='&nbsp;&nbsp;&nbsp;&nbsp;队长:'+input.captain;
                            for(var j=1;j<=20;j++)line+=("&nbsp");
                            line+="<button>查看信息</button>";
                            line+='<br><hr>';

                            count++;
                        }
                        line+="<br><br>"
                        
                    // document.getElementsByClassName("ts-footer")[0].style.top=(400+count*70)+'px';
                        
                        
                        change.innerHTML=line;
                    
                        //设置查看各项队伍信息
                        
                        for(var i=0;i<count;i++)
                        {
                            
                            setclick(i);//bas为偏移量
                        }

                        function setclick(i)
                        {
                            var change=document.getElementsByTagName("button")[i+bas];
                            //window.alert(i);
                            change.style.color='red';
                            change.style.float='right';
                            change.addEventListener("click",()=>
                            {
                                showbox('队伍名称:'+data[i+1].name+'&nbsp;&nbsp;'+'队伍人数:'+data[i+1].members+'&nbsp;&nbsp;队伍简介:'+data[i+1].description);
                            })
                        }
                    }
                    



                /*
                *********************************此段开始为显示队伍信息
                */
                    //构造一个对象
                    function teaminfor(name,description,leader,cnt,member)
                    {
                        this.name=name;
                        this.description=description;
                        this.leader=leader;
                        this.cnt=cnt;
                        this.member=member;
                    }
                    //var member=["gank","tank"];
                    var team={name:"non",description:"现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;现在还没有什么简介;",leader:"王",cnt:4,member:["gank","tank","txt"]};




                    function showteaminfor()
                    {
                        if(check()===true)//如果是队长
                        {
                            bas=team.cnt;//偏移量


                            var change=document.getElementsByTagName("div")[0];//队长中向class a加入元素
                            var line="";
                            

                            line+="<h3>&nbsp;&nbsp;&nbsp;&nbsp;队名";
                            for(var i=1;i<=25;i++)line+="&nbsp";
                            line+=team.name+'<br><hr>';
                            //以上为第1行
                            
                            line+="&nbsp;&nbsp;&nbsp;&nbsp;简介<br><hr>";
                            line+="&nbsp;&nbsp;&nbsp;&nbsp;<div class='description'>"+team.description+'</div><br><hr>';
                            //document.getElementsByClassName("description")[0].style.overflow="scroll";
                            //以上为第2行

                            line+="&nbsp;&nbsp;&nbsp;&nbsp;队长";
                            for(var i=1;i<=25;i++)line+="&nbsp";
                            line+=team.leader+'<br><hr>';
                            //以上为第3行

                            line+="&nbsp;&nbsp;&nbsp;&nbsp;成员数量";
                            for(var i=1;i<=20;i++)line+="&nbsp";
                            line+=team.cnt+'<br><hr>';
                            //以上为第4行

                            line+="&nbsp;&nbsp;&nbsp;&nbsp;成员<br><hr></h3>";
                            for(var i=0;i<team.cnt-1;i++)
                            {
                                line+="<p>&nbsp;&nbsp;&nbsp;&nbsp;"+team.member[i]+"</p>";
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
                            change.style.height="20%";
                            
                            for(var i=0;i<team.cnt-1;i++)
                            {
                                var fbt=document.getElementsByTagName("button")[i];
                                var fp=document.getElementsByTagName("p")[i];
                                //fbt.style.position="absolute";
                                fp.style.display="inline";
                                fbt.style.display="inline";
                                fbt.style.float='right';
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
                                            showbox("该队员已被踢出队伍!");
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
                        var st= document.getElementsByTagName("button")[team.cnt-1];
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
                                        showbox("队伍已解散!");
                                        //window.location.href="main.html";//回到主页面
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


                            var change=document.getElementsByTagName("div")[0];
                            change.style.display="none";//隐藏class a
                            change=document.getElementsByTagName("div")[1];//队员中向class b加入元素
                            change.style.display="block";//启动class b
                            var line="";
                            

                            line+="<h3>&nbsp;&nbsp;&nbsp;&nbsp;队名";
                            for(var i=1;i<=25;i++)line+="&nbsp";
                            line+=team.name+'<br><hr>';
                            //以上为第1行
                            
                            line+="&nbsp;&nbsp;&nbsp;&nbsp;简介<br><hr>";
                            line+='<div class="description">&nbsp;&nbsp;&nbsp;&nbsp;'+team.description+'</div><br><hr>';
                            //以上为第2行

                            line+="&nbsp;&nbsp;&nbsp;&nbsp;队长";
                            for(var i=1;i<=25;i++)line+="&nbsp";
                            line+=team.leader+'<br><hr>';
                            //以上为第3行

                            line+="&nbsp;&nbsp;&nbsp;&nbsp;成员数量";
                            for(var i=1;i<=20;i++)line+="&nbsp";
                            line+=team.cnt+'<br><hr>';
                            //以上为第4行

                            line+="&nbsp;&nbsp;&nbsp;&nbsp;成员<br><hr></h3>";
                            for(var i=0;i<team.cnt-1;i++)
                            {
                                line+="<p>&nbsp;&nbsp;&nbsp;&nbsp;"+team.member[i]+"<hr></p>";
                                
                            }
                            //以上为第5行


                            line+="&nbsp;&nbsp;&nbsp;&nbsp;<button>退出队伍</button>";
                            //以上为最终行
                            
                            change.innerHTML=line;
                            change=document.getElementsByClassName("description")[0];
                            change.style.overflow="scroll";
                            change.style.height="20%";
                            
                            
                            var fbt=document.getElementsByTagName("button")[0];
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
                                        showbox("成功退出队伍!");
                                        //window.location.href="main.html";//回到主页面
                                    }
                                    else
                                    {
                                        showbox("操作失败!");
                                    }
                                });
                                
                            })
                        }
                    }
                    showteaminfor();

                    init();
    }) 

})
    