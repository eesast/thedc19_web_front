    var a=document.getElementById('1');
    var b=document.getElementById('2');
    var c=document.getElementById('3');
    var d=document.getElementById('4');
    var e=document.getElementById('5');
	a.style.backgroundColor='cornflowerblue';
	a.addEventListener('click',function(){change(a,'c1')});
	b.addEventListener('click',function(){change(b,'c2')});
	c.addEventListener('click',function(){change(c,'c3')});
	d.addEventListener('click',function(){change(d,'c3')});
	e.addEventListener('click',function(){change(e,'c3')});
    function change(j,k)//切换表格
	{
		hidden();
		document.getElementById(k).parentNode.style.visibility='visible';
		flag = document.getElementById(k).style.backgroundColor = 'cornflowerblue';
		flag.rows[0].cells[0]
		day = j;
		a.style.backgroundColor='aliceblue';
		b.style.backgroundColor='aliceblue';
		c.style.backgroundColor='aliceblue';
		d.style.backgroundColor='aliceblue';
		e.style.backgroundColor='aliceblue';
		j.style.backgroundColor='cornflowerblue';
	}
    function begin()//开始的初始化
	{
		for(p=1;p<4;p++)
			{
				for(q=1;q<2;q++)
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
    function hidden()//隐藏表格的函数
	{
		document.getElementById('c1').parentNode.style.visibility='hidden';
		document.getElementById('c2').parentNode.style.visibility='hidden';
		document.getElementById('c3').parentNode.style.visibility='hidden';
	}