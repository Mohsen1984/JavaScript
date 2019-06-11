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








