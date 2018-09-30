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
		else{showbox1('输入错误'); return 0;}
	}
	if(min2<0 || min2>60 || !min2){
		if(!min2) min2=0;
		else{showbox1('输入错误'); return 0;}
	}
	days = day.value;
	//只有用户的预约上传,才需要upload
	if(mark == 1) upload(username,days,hour1,hour2,min1,min2)
	else draw(hour1,hour2,min1,min2,mark)
	//根据时间是否分段来渲染
	
}

function draw(hour1,hour2,min1,min2,mark)
{
	//判断时间是否是分段的
	var h1=hour1 + parseFloat(min1)/60;
	var h2=hour2 + parseFloat(min2)/60;
	if(h1>=h2 || hour1<0 || hour2>24 || hour2-hour1>2 || !hour1 || !hour2 ){ showbox1('输入错误');return 0}
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
	if(sign == 2){
		var st=0;
		choose(hour1,12,min1,0,mark,0);
		st = 12;
		choose(12,hour2,0,min2,mark,1);
	}
	else choose(hour1,hour2,min1,min2,mark,sign);
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
		//调整输出时间格式
		var showmin1 = min1.toString()
		var showmin2 = min2.toString()
		var showhour1 = hour1.toString()
		var showhour2 = hour2.toString()
		if(min1<10) showmin1 = '0' + showmin1;
		if(min2<10) showmin2 = '0' + showmin2;
		if(hour1<10) showhour1 = '0' + showhour1;
		if(hour2<10) showhour2 = '0' + showhour2;
		showtime =  showhour1 + ':' + showmin1 + '~' + showhour2 + ':' + showmin2;
		//改变div的属性
		div.style.width = wid1 * wid2+'px';
		div.style.height = '50px';
		div.style.position = 'absolute';
		div.style.marginLeft= ((((hour1 + min1/60)-st)/12)*wid2 + wid0) + 'px';
		div.style.marginTop = '2px'
		if(mark) div.style.backgroundColor = 'cornflowerblue';
		else div.style.backgroundColor = 'rgb(216, 216, 21)';
		div.style.opacity = '0.5';//降低透明度
		//div.innerText = hour1 + ':' + min1 + '~' + hour2 + ':' + min2;
		if(t) div.style.marginTop = '52px'
		//添加div的显示监听 
		div.addEventListener('mouseover',function(){
			div.style.opacity = '1';//回复透明度
			if(min1<10 && min2 <10) div.innerHTML = showhour1 + ':' + showmin1 + '<br>~<br>' + showhour2 + ':' + showmin2;
			if(min1<10 && min2>=10) div.innerHTML= showhour1 + ':' + showmin1 + '<br>~<br>' + showhour2 + ':' + showmin2;
			if(min1>=10 && min2<10) div.innerHTML = showhour1 + ':' + showmin1 + '<br>~<br>' + showhour2 + ':' + showmin2;
			if(min1>=10 && min2>=10) div.innerHTML  = showhour1 + ':' + showmin1 + '<br>~<br>' + showhour2 + ':' + showmin2;
		})
		div.addEventListener('mouseout',function(){
			div.style.opacity = '0.5';//减低透明度
			div.innerText = '';
		})
		if(mark) {
			div.addEventListener('click',function(){showbox2('您确定要取消预约？',this)})
			div.className = 'add';
			appointtime = days + 'T' + hour1 + ':' + showmin1 +'.000Z';
			if(mark == 1)
			{if(document.getElementById('case').innerHTML == '')
			{
			document.getElementById('case').innerHTML = day.value + '号' + showtime + flag.rows[0].cells[0].innerText;
			}
			else{
				document.getElementById('case').innerHTML = document.getElementById('case').innerHTML +'<br>'+
				day.value + '号' + showtime + flag.rows[0].cells[0].innerText;
			}}
			}
		else {div.className = 'all'}
	}
}

function showbox(s)//打印一段话
{
	document.getElementsByClassName("dark")[0].style.display="block";//屏幕半黑
	document.getElementsByClassName("showinfor")[0].style.display="block";//弹框
	document.getElementsByClassName("context")[0].innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;"+s;//弹出消息
	document.getElementsByClassName("ok")[0].style.left="46.5%";
	//设置调用按钮功能
	}
document.getElementsByClassName("ok")[0].addEventListener("click",function()
	{
		//按下了确认
		//优先关闭窗口
		document.getElementsByClassName("dark")[0].style.display="none";//屏幕半黑
		document.getElementsByClassName("showinfor")[0].style.display="none";//弹框
	});
document.getElementsByClassName('no')[0].addEventListener('click',function()
	{
		//按下了取消
		//优先关闭窗口
		document.getElementsByClassName("dark")[0].style.display="none";//屏幕半黑
		document.getElementsByClassName("showinfor")[0].style.display="none";//弹框
	})

function showbox1(s,callback)//打印一段话
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
	  
	   
	});
}
function showbox2(s,time)//打印一段话
{
	document.getElementsByClassName("dark2")[0].style.display="block";//屏幕半黑
	document.getElementsByClassName("showinfor2")[0].style.display="block";//弹框
	document.getElementsByClassName("context2")[0].innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;"+s;//弹出消息
	document.getElementsByClassName("ok2")[0].style.left="46.5%";
	//设置调用按钮功能
	//获取time的内容，del(deltime,div)
	var delhour=time.innerHTML.substring(0,5);
	var deltime=day.value + 'T' + delhour + ':00.000Z';
	console.log(time)
	console.log(deltime);
	document.getElementsByClassName("ok2")[0].addEventListener("click",function()
	{
		//按下了确认
		//优先关闭窗口
		document.getElementsByClassName("dark2")[0].style.display="none";//屏幕半黑
		document.getElementsByClassName("showinfor2")[0].style.display="none";//弹框
		del(deltime,time);
	});
	document.getElementsByClassName('no2')[0].addEventListener('click',function()
	{
		//按下了取消
		//优先关闭窗口
		document.getElementsByClassName("dark2")[0].style.display="none";//屏幕半黑
		document.getElementsByClassName("showinfor2")[0].style.display="none";//弹框
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
document.getElementById('showappointment').addEventListener('click',function(){
	update();
})

//后端交互
var token=getCookie('token');
var username=getCookie('username');
//根据用户名获取队伍id
var Id = getCookie('userid');
var teamId;
var isc=false;
//统一头部
if(token && username)
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
				window.location.href="main.html";
			}
			else
			{

			}
		});
	});
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
	return "";
}

//获得用户的队伍id，判断他是否队长
var url3 = 'https://thedc.eesast.com/api/users/'+ Id;
fetch(url3,{
	headers:{
		'Content-Type':'application/json',
		'x-access-token':token,
	},
}).then(response=>{
	return response.json()
}).then(res=>{
	team = res;
	if(team['team'] != null)
	{
		teamId = team['team']['id'];
		isc=team['team']['isCaptain'];
	}
})

//单个取消预约,返回1时成功
function del(deltime,deldiv){
	var urldel = 'https://thedc.eesast.com/api/sites/0/appointments?startTime='+deltime
	 fetch(urldel,{
		method:'DELETE',
		headers:{
			'Content-Type':'application/json',
			'x-access-token':token,
		}
	}).then(response=>{
		if(response.ok){ 
			showbox1('取消预约成功');
			update();
		}
		else if(response.status == 401){showbox1('登录失效');}
		else {showbox1('取消预约失败')}
	})
}


function update()//获取当前日期的预约情况函数
{
	var query = {
		'startTime':day.value + 'T' +'00:00:00.000Z',
		'endTime':day.value + 'T12:00:00.000Z'
	}
	fetch('https://thedc.eesast.com/api/sites/0/appointments',{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'x-access-token':token,
		},
		'query':query
	}).then(response=>{
		if(response.ok) 
		{showbox1('获取预约情况成功');
		return response.json();
		}
		if(response == 401){showbox1('登录失效');return 0;}
	}).then(res=>{
	var start = res;
	var my1 = document.getElementsByClassName('add');
	var my2 = document.getElementsByClassName('all');
	if(res == 0) return 0;
	for(var ti = 0 ; ti<my1.length; ti++)//把之前的预约信息除去
	{
		my1[ti].parentNode.removeChild(my1[ti])
	}
	for(var ti = 0 ; ti<my1.length; ti++)
	{
		my1[ti].parentNode.removeChild(my1[ti])
	}
	for(var ti = 0 ; ti<my2.length; ti++)//把之前的预约信息除去
	{
		my2[ti].parentNode.removeChild(my2[ti])
	}
	for(var ti = 0 ; ti<my2.length; ti++)
	{
		my2[ti].parentNode.removeChild(my2[ti])
	}
	document.getElementById('showtime').innerHTML='';
	for(var ti=0;ti<start.length;ti++)//将获取的时间数据交给appointing函数渲染
	{
		var getday = start[ti]['startTime'].substring(0,10)
		if(start[ti]['teamId'] == teamId)
		{
			var showtime =start[ti]['startTime'].substring(11,16)+'~'+start[ti]['endTime'].substring(11,16);
			if(document.getElementById('case').innerHTML == '')
			{
			document.getElementById('case').innerHTML = day.value + '号' + showtime + flag.rows[0].cells[0].innerText;
			}
			else{
				document.getElementById('case').innerHTML = document.getElementById('case').innerHTML +'<br>'+
				day.value + '号' + showtime + flag.rows[0].cells[0].innerText;
			}
		}
		if(getday == document.getElementById('demo').value)
			{
			var hour1 =parseInt(start[ti]['startTime'].substring(11,13));
			var min1 =parseInt(start[ti]['startTime'].substring(14,16));
			var hour2 =parseInt(start[ti]['endTime'].substring(11,13));
			var min2 =parseInt(start[ti]['endTime'].substring(14,16));
			if(start[ti]['teamId'] == teamId) //判断用户是否已经预约
			{appointing(
				hour1,min1,hour2,min2,2
			)}
			else {appointing(
				hour1,min1,hour2,min2,0
			)}}}
})
}

function upload(name,days,hour1,hour2,min1,min2)//上传预约数据函数，返回1时失败
{
	var showmin1 = min1.toString()
	var showmin2 = min2.toString()
	var showhour1 = hour1.toString()
	var showhour2 = hour2.toString()
	if(min1<10) showmin1 = '0' + showmin1;
	if(min2<10) showmin2 = '0' + showmin2;
	if(hour1<10) showhour1 = '0' + showhour1;
	if(hour2<10) showhour2 = '0' + showhour2;
	var st = day.value + 'T' + showhour1 + ':' + showmin1 +':00.000Z';
	var et = day.value + 'T' + showhour2 + ':' + showmin2 +':00.000Z';
	var body1 = {
		'startTime':st,
		'endTime':et
	}
	if(isc)
	{fetch('https://thedc.eesast.com/api/sites/0/appointments',{
		method:'POST',
		headers:{
			'Content-Type':'application/json',
			'x-access-token':token
		},
		body:JSON.stringify(body1)
	}).then(response=>{
		if(response.ok) {showbox1("预约成功");draw(hour1,hour2,min1,min2,1)}//上传成功提示
		else if(response.statue == 401) {showbox1('登录失效')}
		else if(response.status == 400) {showbox1('预约时间冲突或者您还没有加入队伍')}
		else if(response.status == 403) {showbox1('一天内预约次数超过 3 次')}
		else {showbox1('预约失败')}//时间冲突提示
	})}
	else {
		showbox1('您不是队长，没有权限');
		draw(hour1,hour2,min1,min2,1)
	}
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
