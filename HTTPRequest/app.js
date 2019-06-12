
document.getElementById('GET').addEventListener('click',function(e){
    const httpa=new easyHTTP();
    
    httpa.get('https://jsonplaceholder.typicode.com/posts',
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

