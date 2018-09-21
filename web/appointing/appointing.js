// JavaScript Document
	var a=document.getElementById('1');
	var b=document.getElementById('2');
	var c=document.getElementById('3');
	var d=document.getElementById('4');
	var e=document.getElementById('5');
	var button1=document.getElementById('6');
	var button2 = document.getElementById('disappointing')
	var t=document.getElementById('c1');
	var time=new Array([5])
	var number=new Array([5])
	var p=0;
	var q=0;
	var i=0;
	var showtime='';
	var day = document.getElementById('1')
	var flag = document.getElementById('c1');
	var space = document.getElementById('1-space1')
	for(i=0;i<5;i++){
		number[i]=new Array([6])
		time[i]=new Array([6]);
		for(var j=0;j<6;j++)
			{
				number[i][j]=0;
			}
	}
	function hidden()//隐藏表格的函数
	{
		document.getElementById('c1').parentNode.style.visibility='hidden';
		document.getElementById('c2').parentNode.style.visibility='hidden';
		document.getElementById('c3').parentNode.style.visibility='hidden';
	}

	function appointing(hour1,min1,hour2,min2,mark)//显示约定的时间,mark用来表示是否为用户添加的时间
	{
		if(hour1<9 || hour1>14 || !hour1){
			return 0;
		}
		if(min1<0 || min1>60 || !min1){
			if(!min1) min1=0
			else return 0;
		}
		if(hour2<9 || hour2>14 || !hour2){
			return 0;
		}
		if(min2<0 || min2>60 || !min2){
			if(!min2) min2=0;
			else return 0;
		}
		if(min1<10 || min2 <10) showtime = hour1 + ':' + '0' + min1 + '~' + hour2 + ':' + '0' + min2;
		else showtime = hour1 + ':' + min1 + '~' + hour2 + ':' + min2;
		document.getElementById('input1').value='';
		document.getElementById('input2').value='';
		document.getElementById('input3').value='';
		document.getElementById('input4').value='';		
		var div = document.createElement('div');
		flag.parentNode.appendChild(div);
		var wid0 = parseFloat(document.getElementsByClassName('time')[0].rows[0].cells[0].offsetWidth);
		var wid2 = 1000-wid0;
		var wid1 = ((hour2 + min2/60)-(hour1 + min1/60))/6;
		div.style.width = wid1 * wid2+'px';
		div.style.height = '50px';
		div.style.position = 'absolute';
		div.style.marginLeft= ((((hour1 + min1/60)-9)/6)*wid2 + wid0) + 'px';
		div.style.marginTop = '2px'
		div.style.backgroundColor = 'cornflowerblue';
		div.style.opacity = '0.5';//降低透明度
		//div.innerText = hour1 + ':' + min1 + '~' + hour2 + ':' + min2;
		div.style.lineHeight = '50px';
		document.getElementById('showtime').innerText ='您预约的时间和地点：' + day.innerText + showtime + flag.rows[0].cells[0].innerText;
		div.addEventListener('mouseover',function(){
		div.style.opacity = '1';//回复透明度
		div.innerText =showtime;
		})
		div.addEventListener('mouseout',function(){
		div.style.opacity = '0.5';//减低透明度
		div.innerText = '';
		})
		if(mark) div.className = 'add';
	}
	function white(){
		for(p=1;p<4;p++)
		{
			for(q=1;q<3;q++)
				{
					var st=String(p)+'-place'+String(q);
					document.getElementById(st).style.backgroundColor = 'white';
				}
		}
	}
	function choose(j)//选择时间按钮
	{
		white();
		j.style.backgroundColor='cornflowerblue';
		space = j;
	}
	function begin()//开始的初始化
	{
		for(p=1;p<4;p++)
			{
				for(q=1;q<3;q++)
					{
						var st=String(p)+'-place'+String(q);
						var id1=p;
						var id2=q;
						if(q==1) document.getElementById(st).style.backgroundColor = 'cornflowerblue';
						else document.getElementById(st).style.backgroundColor = 'white';
						document.getElementById(st).addEventListener('click',function(){
							//alert('click'+this.getAttribute('id'))
							choose(this)
						});
					}
			}
	}
	function change(j,k)//切换表格
	{
		hidden();
		document.getElementById(k).parentNode.style.visibility='visible';
		flag = document.getElementById(k);
		day = j;
		a.style.backgroundColor='aliceblue';
		b.style.backgroundColor='aliceblue';
		c.style.backgroundColor='aliceblue';
		d.style.backgroundColor='aliceblue';
		e.style.backgroundColor='aliceblue';
		j.style.backgroundColor='cornflowerblue';
	}
	function showbox(s,callback)//打印一段话
    {
        document.getElementsByClassName("dark")[0].style.display="block";//屏幕半黑
        document.getElementsByClassName("showinfor")[0].style.display="block";//弹框
        document.getElementsByClassName("context")[0].innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;"+s;//弹出消息
        document.getElementsByClassName("ok")[0].style.left="46.5%";
        //设置调用按钮功能
        
        document.getElementsByClassName("ok")[0].addEventListener("click",function()
        {
            //按下了确认
            //优先关闭窗口
            document.getElementsByClassName("dark")[0].style.display="none";//屏幕半黑
            document.getElementsByClassName("showinfor")[0].style.display="none";//弹框
            if(callback && typeof(callback)==="function")
            {
                callback();
			}
        });
		document.getElementsByClassName('no')[0].addEventListener('click',function()
	{
		//按下了取消
        //优先关闭窗口
        document.getElementsByClassName("dark")[0].style.display="none";//屏幕半黑
		document.getElementsByClassName("showinfor")[0].style.display="none";//弹框
	})
    }
	begin();
	hidden();
	document.getElementById('c1').parentNode.style.visibility='visible';
	a.style.backgroundColor='cornflowerblue';
	a.addEventListener('click',function(){change(a,'c1')});
	b.addEventListener('click',function(){change(b,'c2')});
	c.addEventListener('click',function(){change(c,'c3')});
	d.addEventListener('click',function(){change(d,'c3')});
	e.addEventListener('click',function(){change(e,'c3')});
	button1.addEventListener//预约按钮的功能实现
	('click',function(){appointing(
		parseInt(document.getElementById('input1').value),
		parseInt(document.getElementById('input2').value),
		parseInt(document.getElementById('input3').value),
		parseInt(document.getElementById('input4').value),
		1
	)})
	button2.addEventListener//取消预约按钮的功能实现
	('click',function(){showbox('确定要取消您所有的预约',
		function(){
			var my = document.getElementsByClassName('add');
			for(var ti = 0 ; ti<my.length;ti++)
			{
				my[ti].parentNode.removeChild(my[ti])
			}
			document.getElementById('showtime').innerText ='您预约的时间和地点：' ;
		})
	})

	var mybody={'username':'admin','password':'eesast-software'}
	var url='http://58.87.111.176/api/auth'
	var myheaders = new Headers(
		{
			contentType: "application/x-www-form-urlencoded",
		}
	)
	fetch(url,{method:'POST',
			   headers:myheaders,
			   body:mybody
			  }).then(response=>{
				  console.log(response.body)
			  }).catch(error=>{console.log('error')})