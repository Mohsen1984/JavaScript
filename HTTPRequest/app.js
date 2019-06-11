function easyHTTP()
{
    const http=XMLHttpRequest();
}



easyHTTP.prototype.get=function (url)
{
    this.http.open('GET',url,true);
    
    this.http.onload=function()
    {
        if(this.http.status===200)
        {
            console.log(http.responseText);
        }
    }
    this.http.send();

}