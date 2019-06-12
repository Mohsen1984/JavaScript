function easyHTTP()
{
    this.http=new XMLHttpRequest();


}


//GET
easyHTTP.prototype.get=function (url,callback)
{
    this.http.open('GET',url);

    let self=this;
    this.http.onload=function()
    {
        if(self.http.status===200)
        {
            console.log(self.http.status);
            callback(self.http.responseText);
            
     
        }
    }

    this.http.send();
}

//POST
easyHTTP.prototype.post=function(url,data,callback)
{
    this.http.open('POST',url);
    this.http.setRequestHeader('Content-type','application/json');
    this.http.send(JSON.stringify(data));
   

    let self=this;
    this.http.onload=function ()
    {
        callback(self.http.responseText);
    }
   
}


easyHTTP.prototype.postPromis=function(url,data)
{
    let self=this;
    const promis=new Promise((resolve,reject)=>{
        self.http.open('POST',url);
        self.http.setRequestHeader('Content-type','application/json');
        self.http.send(JSON.stringify(data));
       
    
        
        this.http.onload=function ()
        {
            if(self.http.status===201)
            {
                resolve(self.http.responseText);
            }
                else
                {
                    reject('errore')
                }
        }


    });

    return promis;

   
}

//DELETE
easyHTTP.prototype.delete=function(url)
{
    let self=this;
    let promis=new Promise((resolve,reject)=>{
        console.log(self);
        self.http.open('DELETE',url);
      
        self.http.onload=()=>{
                if(self.http.status===200)
                {
                    resolve('DELETE OBJECT');
                }
                else
                {
                    reject('errore');
                }

        };
        self.http.send();


    });
    return (promis);

}








