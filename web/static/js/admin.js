var token=getCookie('token');
var teams;
var users;
var r;
var day = document.getElementById('demo');
function GETINFO(){
	sh0();
	sh2();
	sh3();
}
function sh2(){
	var query = {

	};
	fetch('https://thedc.eesast.com/api/teams',{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'x-access-token':token,
		},
		'query':query
	}).then(response=>{if(response.ok) return response.json();
	}).then(res=>window.teams=res)
}

function sh3(){
	var query = {

	};
	fetch('https://thedc.eesast.com/api/users',{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'x-access-token':token,
		},
		'query':query
	}).then(response=>{if(response.ok) return response.json();
	}).then(res=>window.users=res)
}
function sh0(){
    
	var query = {
		'startTime':day.value + 'T' +'00:00:00.000Z',
		'endTime':day.value + 'T12:00:00.000Z'
	}
	fetch('https://thedc.eesast.com/api/sites/1/appointments',{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'x-access-token':token,
		},
		'query':query
	}).then(response=>{if(response.ok) return response.json();
	}).then(res=>window.r=res)
}
function sh1(){
	var r = window.r;
	sortj = (a, b) => {return a.startTime>b.startTime?1:-1;} //sort
	r = r.sort(sortj)
	var table = document.getElementById("t");
	table.innerHTML="";
	for (var i = 0; i < r.length; i++){
		if (r[i]["startTime"]<day.value + 'T' +'00:00:00.000Z'|r[i]["startTime"]>day.value + 'T23:59:00.000Z') continue;
		var stime = r[i]["startTime"].match("T.*00.000Z")[0];
		var etime = r[i]["endTime"].match("T.*00.000Z")[0];
		var tteam = teams.filter(x=>{return x.id == r[i]["teamId"]})[0];
		var capid = tteam["captain"];
		var teamname = tteam["name"];
		var capname = users.filter(x=>{return x.id == capid})[0]["realname"];
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		teamnamen=document.createTextNode(teamname);
		capnamen=document.createTextNode(capname);
		timen=document.createTextNode(stime.slice(1,6)+'-'+etime.slice(1,6))
		td1.appendChild(teamnamen);
		td2.appendChild(capnamen);
		td3.appendChild(timen);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
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
