var url = 'https://thedc20.eesast.com/api/auth'
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
fetch('https://thedc20.eesast.com/api/appointing/#'
).then(response=>{
    
})
