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
                id:3,
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
            //console.log(data);
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
        updateItems:function(name,calori)
        {
            let found=null;
            data.items.forEach((item)=>{
                    if(item.id===data.currentItem.id)
                    {
                        item.name=name;
                        item.caleri=parseInt(calori);
                        found=item;
                    }

            });
            return found;

        },
        getItemById:function(id){
           let curitem=data.items.filter((item)=>item.id===id);
           if(curitem.length>=0)
           {
               return curitem[0];
           }
           
           
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
        itemLists:'#item-list li',
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
        addItemToForm:function(){
            const data=itemCtrl.getdata();
            item=data.currentItem;
           
            document.querySelector(uiSelector.itemNameInput).value=item.name;
            document.querySelector(`[for=item-name]`).className='active';
            document.querySelector(uiSelector.itemCaloriesInput).value=item.caleri;            
            document.querySelector(`[for=item-calories]`).className='active';
        },
        updateItems:function(item)
        {
            console.log(item);
            let listLtems=document.querySelectorAll(uiSelector.itemLists);
            listLtems=Array.from(listLtems);
            listLtems.forEach((items)=>{
                const itemID=items.getAttribute('id');
                if(itemID===`item-${item.id}`)
                {
                    document.querySelector(`#${itemID}`).innerHTML=`<strong>${item.name}:</strong><em>${item.caleri} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="fa fa-pencil"></i>
                    </a>`;
                }
            });
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
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);
        document.querySelector(UISelectors.backBtn).addEventListener('click',back);
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
        document.addEventListener('keypress',function(e){
            if(e.keyCode===13 || e.wich===13)
            {
                e.preventDefault();
                return false;
            }
        });


 
    }
    const back=function(e)
    {
            console.log('back');
            uiCtrl.clearInput();
            uiCtrl.clearEditState();
    }
    //Click EditItem
    const itemEditClick=function(e)
    {
        if(e.target.localName==="i")
        {
            
            var itemId=(e.target.parentElement.parentElement).id.split('-');
            let id=parseInt(itemId[1]);
            let curitem=itemCtrl.getItemById(id);
            itemCtrl.setCurentItem(curitem);
            uiCtrl.showEditState();
            uiCtrl.addItemToForm();
        }
        e.preventDefault();

    }

    //update Click
    const itemUpdateSubmit=function(e)
    {
        let newValue=uiCtrl.getItemInput();
        let updateItem=itemCtrl.updateItems(newValue.name,newValue.calori);
        uiCtrl.updateItems(updateItem);
        uiCtrl.clearInput();

        uiCtrl.clearEditState();

        console.log(itemCtrl.getTotalCalori());
        uiCtrl.showTotalCalories(itemCtrl.getTotalCalori());
        e.preventDefault();
    }
    const itemAddSubmit=function(e)
    {
        console.log('submit')
        const values=uiCtrl.getItemInput();
        if(values.name!=='' && values.calori!=='')
        {
            const newItem=itemCtrl.addItem(values.name,values.calori);
            
            uiCtrl.addItem(newItem);
            uiCtrl.clearInput();
          
        }
        e.preventDefault();
    }
    return {
        init : function(){
           // console.log(itemCtrl.getItems());
            
            uiCtrl.populateItemList(itemCtrl.getItems());
            uiCtrl.showTotalCalories(itemCtrl.getTotalCalori());
            loadEvantListeners();
            console.log('INIT');
            uiCtrl.clearInput();
            uiCtrl.clearEditState();
        }
    }
})(itemCtrl,uiCtrl);
App.init();