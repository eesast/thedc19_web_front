// JavaScript Document
	var a=document.getElementById('1');
	var b=document.getElementById('2');
	var c=document.getElementById('3');
	var d=document.getElementById('4');
	var e=document.getElementById('5');
	var button=document.getElementById('6');
	var t=document.getElementById('c1');
	var time=new Array([5])
	var number=new Array([5])
	var p=0;
	var q=0;
	var i=0;
	for(i=0;i<5;i++){
		number[i]=new Array([6])
		time[i]=new Array([6]);
		for(var j=0;j<6;j++)
			{
				number[i][j]=0;
			}
	}
	function hidden(){
		document.getElementById('c1').style.visibility='hidden';
		document.getElementById('c2').style.visibility='hidden';
		document.getElementById('c3').style.visibility='hidden';
	}
	function choose(j,k){
		if(time[j][k].style.backgroundColor=='white'){
			time[j][k].style.backgroundColor='cornflowerblue';
			number[j][k]=1;
		}
		else {
			time[j][k].style.backgroundColor='white';
			number[j][k]=0;
		}
	}
	function begin(){
		for(p=0;p<3;p++)
			{
				for(q=0;q<6;q++)
					{
						var st=String(p)+String(q);
						var id1=p;
						var id2=q;
						time[p][q]=document.getElementById(st);
						time[p][q].style.backgroundColor='white';
						document.getElementById(st).addEventListener('click',function(){
							//alert('click'+this.getAttribute('id'))
							choose(this.getAttribute('id')[0],this.getAttribute('id')[1])
						});
					}
			}
	}
	function change(j,k)
	{
		hidden();
		document.getElementById(k).style.visibility='visible';
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

    }
	begin();
	hidden();
	document.getElementById('c1').style.visibility='visible';
	a.style.backgroundColor='cornflowerblue';
	a.addEventListener('click',function(){change(a,'c1')});
	b.addEventListener('click',function(){change(b,'c2')});
	c.addEventListener('click',function(){change(c,'c3')});
	d.addEventListener('click',function(){change(d,'c3')});
	e.addEventListener('click',function(){change(e,'c3')});
	button.addEventListener('click',function(){showbox(number)})