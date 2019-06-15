
document.getElementById('GET').addEventListener('click',function(e){
    const httpa=new easyHTTP();
    
    httpa.get('https://jsonplaceholder.typicode.com/posts/',
                            function(response)
                            {
                                console.log(response);
                               
                               
                            }
    );
    e.preventDefault();
})



document.getElementById('POST').addEventListener('click',function(e){
const data = 
{
    
    title:'my open test',
    body: 'bodi is'
};
const httpa=new easyHTTP();
httpa.post('https://jsonplaceholder.typicode.com/posts',data,
                    function(a)
                    {
                        console.log(a);
                    }
            );
            e.preventDefault();

});
document.getElementById('POSTPromis').addEventListener('click',function(e){
    const data = 
    {
        
        title:'my open test',
        'body': 'bodi is'
    };
    const httpa=new easyHTTP();
    httpa.postPromis('https://jsonplaceholder.typicode.com/posts',data)
                    .then(function(a){console.log(a)})
                    .catch(function(a){console.log(a)});
                
     e.preventDefault();
    
    });


document.getElementById('DELETE').addEventListener('click',function(e){

    const httpa=new easyHTTP();
    httpa.delete('https://jsonplaceholder.typicode.com/posts/10/1').then(function(a){console.log(a)}).catch(function(a){console.log(a)});
    e.preventDefault();
    
});



document.getElementById('getJson').addEventListener('click',function(e){
    const http = new EasyHttp2();
    
    http.getJson('https://jsonplaceholder.typicode.com/posts/').then(data=> console.log(data));
    http.getText('./mytext.txt').then(data=> console.log(data));
    
    e.preventDefault();
})


document.getElementById('postObject').addEventListener('click',function(e){
    const http = new EasyHttp2();
    
    http.postJson('https://jsonplaceholder.typicode.com/posts/',{title:'Mohsen',body:'Body of mesage'}).then(data=> console.log(data));
    
    
    e.preventDefault();
})