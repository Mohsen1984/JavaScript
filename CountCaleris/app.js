//Storage Controller


//Item Controller
const itemCtrl=(function(){

    const Item=function(id,name,caleri){
        this.name=name;
        this.id=id;
        this.caleri=caleri;
    }

    const data=
    {
        items :[
            {
                id:1,
                name:'Stake',
                caleri:1200
            },
            {
                id:2,
                name:'Kabab',
                caleri:800
            },
            {
                id:1,
                name:'Pizza',
                caleri:3200
            },

        ],
        currentItem:null,
        totalCalories:0
}
    
    return {
        getTotalCalori:function(){

            let count=0;
            data.items.forEach(item=>{count+=item.caleri;});
            data.totalCalories=count;
            return data.totalCalories;
        },
        getItems:function ()
        {
            return data.items;
        },
        getdata:function()
        {
            return data;
        },
        addItem:function(name,calori)
        {
            let ID;
            if(data.items.length>0)
            {
                ID=data.items[data.items.length-1].id+1;
            }
            else
            {
                ID=1;
            }
            const newItem=new Item(ID,name,parseInt(calori));
            data.items.push(newItem);
            return newItem;
        },
        getItemById:function(id){
           return data.items.filter((item)=>item.id===id);
           
        },
        setCurentItem:function(curentitem)
        {
            data.currentItem=curentitem;
        }
    }

})();

//UI Controller
const uiCtrl=(function(){
    const uiSelector={
        itemList:'#item-list',
        itemCaloriesInput:'#item-Calories',
        itemNameInput:'#item-Name',
        addBtn:'.add-btn',
        updateBtn:'.update-btn',
        deleteBtn:'.delete-btn',
        totalCalories :'.total-calories',
        backBtn:'.back-btn'
    }

    return {

        populateItemList:function(items){
            let html='';
            items.forEach(item => {
                html+=
                `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}:</strong><em>${item.caleri} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil"></i>
                </a>
            </li>
                `;
            });
            document.querySelector(uiSelector.itemList).innerHTML=html;
        },
        addItem:function(item){

            const li =document.createElement('li');
            li.className= 'collection-item';
            li.id= `item-${item.id}`;
            li.innerHTML=`<strong>${item.name}:</strong><em>${item.caleri} Calories</em>
            <a href="#" class="secondary-content">
                <i class="fa fa-pencil"></i>
            </a>`;
            
            const ul=document.querySelector(uiSelector.itemList).insertAdjacentElement('beforeend',li);
            
        },
        clearInput:function()
        {
            document.querySelector(uiSelector.itemNameInput).value='';
            document.querySelector(uiSelector.itemCaloriesInput).value='';
        },
        clearEditState:function(){
            document.querySelector(uiSelector.updateBtn).style.display='none';
            document.querySelector(uiSelector.deleteBtn).style.display='none';
            document.querySelector(uiSelector.backBtn).style.display='none';
            document.querySelector(uiSelector.addBtn).style.display='inline';
        },
        showEditState:function(){
            document.querySelector(uiSelector.updateBtn).style.display='inline';
            document.querySelector(uiSelector.deleteBtn).style.display='inline';
            document.querySelector(uiSelector.backBtn).style.display='inline';
            document.querySelector(uiSelector.addBtn).style.display='none';
        },

        getSelectors:function(){return uiSelector},
        getItemInput:function()
        {
            return {
                name:document.querySelector(uiSelector.itemNameInput).value,
                calori:document.querySelector(uiSelector.itemCaloriesInput).value
            }

        },
        showTotalCalories:(totalCalories)=>{
            document.querySelector(uiSelector.totalCalories).textContent=totalCalories;
        }


    }
})();

//App
const App=(function(itemCtrl,uiCtrl){
    //Load Event Listener
    const loadEvantListeners=function()
    {

        const UISelectors=uiCtrl.getSelectors();
       // console.log(UISelectors);
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);
        document.querySelector(UISelectors.itemList).addEventListener('click',itemUpdateSubmit);

 
    }
    const itemUpdateSubmit=function(e)
    {
        if(e.target.localName==="i")
        {
            
            var itemId=(e.target.parentElement.parentElement).id.split('-')
            let id=parseInt(itemId[1]);
            let curitem=itemCtrl.getItemById(id);
            itemCtrl.setCurentItem(curitem);
        }


    }
    const itemAddSubmit=function(e)
    {
        const values=uiCtrl.getItemInput();
        if(values.name!=='' && values.calori!=='')
        {
            const newItem=itemCtrl.addItem(values.name,values.calori);
            console.log(newItem);
            uiCtrl.addItem(newItem);
            uiCtrl.clearInput();
            uiCtrl.showTotalCalories(itemCtrl.getTotalCalori());
        }
        e.preventDefault();
    }
    return {
        init : function(){
           // console.log(itemCtrl.getItems());
            
            uiCtrl.populateItemList(itemCtrl.getItems());
            loadEvantListeners();
            console.log('INIT');
  
            uiCtrl.clearEditState();
        }
    }
})(itemCtrl,uiCtrl);
App.init();