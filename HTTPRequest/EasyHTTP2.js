//fetch data from server

class EasyHttp2 {

    getJson(url=''){
       const data= fetch(url).then(res => {console.log(res); return res.json();}).catch(rej=>  rej);
     
       return data;
    }

    getText(url=''){
        const data= fetch(url).then(res => { return res.text();}).catch(rej=>  rej);
        
     
        return data;
    }

    //data: Obejct
    postJson(url='',data={})
    {
        return fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(res=>{ return res.json();}).catch(rej=>rej);
    }


}