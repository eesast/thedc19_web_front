var url = 'http://58.87.111.176/api/auth'
var mybody = {'username':'admin',
'password':'eesast-software'
}
var taken = ''
fetch(url,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(mybody)
}).then(response=>{
    taken = response.body.taken
}),error=>{
    alert('error')
}
fetch('https://58.87.111.176/api/appointing/#'
).then(response=>{
    
})