objects=[{name:'Mohsen',family:'Rahimi'},{name:'ali',family:'rezai'}];

function createPost(post)
{
    return new Promise(function(resolve,reject)
    {
        let err=false;
        setTimeout(function(){
                objects.push(post);
                if(!err)
                {
              
                        resolve();
                }
                else
                {
                    reject('errore');
                }
        },1000);
    }
    )
}


const getdata=function()
{
    
    objects.forEach(data => {
        console.log(data);
    });
}

createPost({name:'ahmad',family:'ssss'}).then(getdata).catch(function(mess){console.log(mess)});
