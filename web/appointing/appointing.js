// JavaScript Document
	var button1=document.getElementById('6');
	var button2 = document.getElementById('disappointing')
	var t=document.getElementById('c1');
	var p=0;
	var q=0;
	var i=0;
	var appointtime=''; //预约时间
	var showtime='';
	var days = '';
	var day = document.getElementById('demo')
	var flag = document.getElementById('c1');
	var space = document.getElementById('1-space1')
	function appointing(hour1,min1,hour2,min2,mark)//显示约定的时间,mark用来表示是否为用户添加的时间
	{
		var sign = 1;
		//清空输入框
		document.getElementById('input1').value='';
		document.getElementById('input2').value='';
		document.getElementById('input3').value='';
		document.getElementById('input4').value='';
		//判断是否合理
		if(min1<0 || min1>60 || !min1){
			if(!min1) min1=0
			else{showbox('输入错误'); return 0;}
		}
		if(min2<0 || min2>60 || !min2){
			if(!min2) min2=0;
			else{showbox('输入错误'); return 0;}
		}
		//判断时间是否是分段的
		var h1=hour1 + parseFloat(min1)/60;
		var h2=hour2 + parseFloat(min2)/60;
		if(h1>=h2 || hour1<0 || hour2>24 || hour2-hour1>2 || !hour1 || !hour2 ){ showbox('输入错误');return 0}
		else{ if(h1<12 && h2<=12){
			sign = 0;
			var st=0;
		}
		if(h1>=12 && h2>12) {
			sign = 1;
			var st = 12;
		}
		if(h1<12 && h2>12){
			sign = 2
		}
		}
		//调整输出时间格式
		var showmin1 = min1.toString()
		var showmin2 = min2.toString()
		if(min1<10) showmin1 = '0' + showmin1;
		if(min2<10) showmin2 = '0' + showmin2;
		showtime =  hour1 + ':' + showmin1 + '~' + hour2 + ':' + showmin2;
		//只有用户的预约上传,upload返回1时预约失败
		if(mark == 1){if(upload(username,days,hour1,hour2,showmin1,showmin2)) {showbox('预约失败');return 0}}
		//根据时间是否分段来渲染
		if(sign == 2){
			var st=0;
			choose(hour1,12,min1,0,mark,0);
			st = 12;
			choose(12,hour2,0,min2,mark,1);
		}
		else choose(hour1,hour2,min1,min2,mark,sign);
		days = day.value;
		//渲染函数
		function choose(hour1,hour2,min1,min2,mark,t)
		{	//添加子div
			var div = document.createElement('div');
			div.style.fontSize = '10px';
			document.getElementById('c1').parentNode.appendChild(div);
			//计算所选时间的长度的占比
			var wid0 = parseFloat(document.getElementsByClassName('time')[0].rows[0].cells[0].offsetWidth);
			var wid2 = 1000-wid0;
			var wid1 = ((hour2 + min2/60)-(hour1 + min1/60))/12;
			//改变div的属性
			div.style.width = wid1 * wid2+'px';
			div.style.height = '50px';
			div.style.position = 'absolute';
			div.style.marginLeft= ((((hour1 + min1/60)-st)/12)*wid2 + wid0) + 'px';
			div.style.marginTop = '3px'
			div.style.backgroundColor = 'cornflowerblue';
			div.style.opacity = '0.5';//降低透明度
			//div.innerText = hour1 + ':' + min1 + '~' + hour2 + ':' + min2;
			if(t) div.style.marginTop = '56px'
			//添加div的显示监听 
			div.addEventListener('mouseover',function(){
				div.style.opacity = '1';//回复透明度
				if(min1<10 && min2 <10) div.innerHTML = hour1 + ':' + '0' + min1 + '<br>~<br>' + hour2 + ':' + '0' + min2;
				if(min1<10 && min2>=10) div.innerHTML= hour1 + ':' + '0' + min1 + '<br>~<br>' + hour2 + ':' + min2;
				if(min1>=10 && min2<10) div.innerHTML = hour1 + ':' + min1 + '<br>~<br>' + hour2 + ':' + '0' + min2;
				if(min1>=10 && min2>=10) div.innerHTML  = hour1 + ':' + min1 + '<br>~<br>' + hour2 + ':' + min2;
			})
			div.addEventListener('mouseout',function(){
				div.style.opacity = '0.5';//减低透明度
				div.innerText = '';
			})
			if(mark) {
				div.className = 'add';
				appointtime = days + 'T' + hour1 + ':' + showmin1 +'.000Z'
				document.getElementById('showtime').innerText ='您预约的时间和地点：' + day.value + '号' + showtime + flag.rows[0].cells[0].innerText;
					}
		}
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
	document.getElementById('1-place1').style.backgroundColor = 'cornflowerblue';
	document.getElementById('1-place2').style.backgroundColor = 'cornflowerblue';
	document.getElementById('c1').parentNode.style.visibility='visible';
	button1.addEventListener//预约按钮的功能实现
	('click',function(){
		appointing(
		parseInt(document.getElementById('input1').value),
		parseInt(document.getElementById('input2').value),
		parseInt(document.getElementById('input3').value),
		parseInt(document.getElementById('input4').value),
		1)
	})
	button2.addEventListener//取消预约按钮的功能实现
	('click',function(){showbox('确定要取消您所有的预约',
		function(){
			if(del())
		{
		var my = document.getElementsByClassName('add');
		for(var ti = 0 ; ti<my.length; ti++)
		{
			my[ti].parentNode.removeChild(my[ti])
		}
		for(var ti = 0 ; ti<my.length; ti++)
		{
			my[ti].parentNode.removeChild(my[ti])
		}
		document.getElementById('showtime').innerText ='您预约的时间和地点：' ;
	}
		})
	})
	//显示预约情况
	document.getElementById('showappointment').addEventListener('click',function(){
		update(days);
	})





	//后端交互
	var token=getCookie('token');
	var username=getCookie('username');//登陆后传入
	//根据用户名获取队伍id
	var teamId = '';
	fetch('http://58.87.111.176/api/user',{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
		},
	}).then(response=>{
		var all = response.json();
		for(var tt = 0;tt<all.length;tt++)
		{
			if(all[tt]['username'] == username){
					teamId = all[tt]['team']['id'];
			}
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
		return "";
	}
	//取消预约
	function del(){
		fetch('http://58.87.111.176/api/user',{
			method:'GET',
			headers:{
				'Content-Type':'application/json',
			},
		}).then(response=>{
			var all = response.json();
			for(var tt = 0;tt<all.length;tt++)
			{
				if(all[tt]['username'] == username){
					if(all[tt]['team']['isCaptain']){}
					else {showbox('您不是队长，无法取消预约');return 0} //判断取消预约者是不是队长
				}
			}
		})
		fetch('http://58.87.111.176/api/sites/:no1/appointments',{
			method:'DELETE',
			headers:{
				'Content-Type':'application/json',
				'x-access-token':token,
			},
			'query':{'startTime':appointtime}
		}).then(response=>{
			if(response.ok){ showbox('取消预约成功');return 1}
			else return 0;
		})
	}
	function update(day)//获取当前日期的预约情况函数
	{
		var query = {
			'startTime':days + 'T' +'00:00.000Z',
			'endTime':days + 'T12:00.000Z'
		}
		fetch('http://58.87.111.176/api/sites/:no1/appointments',{
			method:'GET',
			headers:{
				'Content-Type':'application/json',
				'x-access-token':token,
			},
			'query':query
		}).then(response=>{
			if(response.ok) showbox('获取预约情况成功')
			var start = response.json();
			for(var ti=0;ti<start.length;ti++)//将获取的时间数据交给appointing函数渲染
			{
					var hour1 =parseInt(start[ti]['startTime'].substring(11,13));
					var min1 =parseInt(start[ti]['startTime'].substring(14,15));
					var hour1 =parseInt(start[ti]['endTime'].substring(11,13));
					var min1 =parseInt(start[ti]['endTime'].substring(14,15));
					if(start[ti]['teamId'] == teamId) //判断用户是否已经预约
					{ppointing(
						hour1,min1,hour2,min2,2
					)}
					else {ppointing(
						hour1,min1,hour2,min2,0
					)}
		}})
	}
	function upload(name,days,hour1,hour2,min1,min2)//上传预约数据函数
	{
		var st = days + 'T' + hour1 + ':' + min1 +':00.000Z';
		var et = days + 'T' + hour2 + ':' + min2 +':00.000Z'
		var teamId = '';
		fetch('http://58.87.111.176/api/user',{
			method:'GET',
			headers:{
				'Content-Type':'application/json',
			},
		}).then(response=>{
			var all = response.json();
			for(var tt = 0;tt<all.length;tt++)
			{
				if(all[tt]['username'] == username){
					if(all[tt]['team']['isCaptain']){}
					else {showbox('您不是队长，无法预约');return 1} //判断预约者是不是队长
				}
			}
		})
		var body1 = {
			'teamId':teamId,
			'startTime':st,
			'endtime':et
		}
		fetch('http://58.87.111.176/api/sites/:no1/appointments',{
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'x-access-token':token
			},
			body:JSON.stringify(body1)
		}).then(response=>{
			if(response.ok) {showbox("预约成功");return 0}//上传成功提示
			if(response.status=409) {showbox('预约时间冲突');return 1}//时间冲突提示
		})
	}

	//以下为以前版本
	//fetch('https://58.87.111.176/api/sites/:id',{
	//	headers:
	//	{
	//		'Content-Type':'application/json',
	//		'x-access-token':token
	//	}
	//}).then(response=>{
	//	var start = response.json();
	//	for(var ti=0;ti<start.length;ti++)
	//	{
	//		var days = start[0]['startTime'].substring(0,10);
	//		var element1 = document.getElementById(days)
	//		var hour1 =parseInt(start[0]['startTime'].substring(11,13));
	//	var min1 =parseInt(start[0]['startTime'].substring(14,15));
	//		var hour1 =parseInt(start[0]['endTime'].substring(11,13));
	//		var min1 =parseInt(start[0]['endTime'].substring(14,15));
	//		appointing(
	//			element1,hour1,min1,hour2,min2,0
	//		)
	//	}
	//})
