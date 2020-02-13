"use strict";

var myInit = { method : 'GET',
    headers : {
        'Content-Type':'application/json'
    },
    mode: 'cors',
    cache: 'default'};

let myRequest = new Request("./ddbb.json",myInit);

fetch(myRequest)
.then((resp)=> resp.json())
.then((data)=> data.ddbb)
.then((foods)=> {
    var index=0;
    var size = foods.length;

    var mainView = true;
    var flagPreparacion = false;


    var specificCard = document.querySelector('#specific-card');
    var viewCards = document.querySelector('#cards');

    create_items(foods);
    updateItemsFocus(index);


    if (annyang) {
        // Let's define a command.
        annyang.debug();
        annyang.setLanguage('es-US');

        var commands = {
            'receta anterior': function() { 
                if(mainView){
                    index = (index-1+size)%size; 
                    updateItemsFocus(index)
                    console.log("anterior");
                }
                flagPreparacion = false;
            },
            'receta siguiente' : function() { 
                if(mainView){
                    index = (index+1)%size;
                    updateItemsFocus(index);
                    console.log("siguiente");
                }
                flagPreparacion = false;
            },
            'elegir' : function(){
                if(mainView){
                    
                    clearView(specificCard);
                    viewItem(foods[index],specificCard);
                    mainView = false;

                    viewCards.style.display = "none";
                    specificCard.style.display = "block"; 
                }
                flagPreparacion = false;
            },
            'atras' : function(){
                if(!mainView){
                    mainView=true;
                    viewCards.style.display = "block";
                    specificCard.style.display = "none"; 
                }
                flagPreparacion = false;
            },
            'ingredientes' : function(){
                if(!mainView){
                    document.querySelector('#ingredients').scrollIntoView(); 
                }
                flagPreparacion = false;
            },
            'preparacion' : function(){
                if(!mainView){
                    document.querySelector('#directions').scrollIntoView(); 
                    flagPreparacion = true;
                }
            },
            'paso 1' : () => {if(!mainView && flagPreparacion) readStep('#dir1')},
            'paso 2' : () => {if(!mainView && flagPreparacion) readStep('#dir2')},
            'paso 3' : () => {if(!mainView && flagPreparacion) readStep('#dir3')},
            'paso 4' : () => {if(!mainView && flagPreparacion) readStep('#dir4')},
            'paso 5' : () => {if(!mainView && flagPreparacion) readStep('#dir5')},
            'paso 6' : () => {if(!mainView && flagPreparacion) readStep('#dir6')},
            'paso 7' : () => {if(!mainView && flagPreparacion) readStep('#dir7')},
            'paso 8' : () => {if(!mainView && flagPreparacion) readStep('#dir8')},
            'paso 9' : () => {if(!mainView && flagPreparacion) readStep('#dir9')},
            'paso 10' : () => {if(!mainView && flagPreparacion) readStep('#dir10')},
            
        };
    
        // Add our commands to annyang
        annyang.addCommands(commands);
    
        // Start listening.
        annyang.start();
    }

});



// CONSTRUCT ITEMS

function create_items(foods){
    foods.forEach((food,index) => {
        let c = document.createElement("div");

        c.innerHTML = `<div class="card" id="code${index}">
        <h5 class="card-header list-group-item list-group-item-action flex-column align-items-start">${food.title}</h5>
        <div class="row">
            <div class="col-sm-8">
                <div class="card-body">
                    <h5 class="card-title">${food.title}</h5>
                    <p class="card-text">${food.description}</p>
                    <a href="#" class="btn btn-primary">Ir a la receta</a>
                </div>
            </div>
                
            <div class="col-sm-4">
                <img class="card-img-top" src=${food.srcImagen} width="200px" alt="Card image cap">
            </div>
        </div>            
    </div>`

        let card = c.childNodes[0];

        cards.appendChild(card);
    });
}

// CHECK ITEM

function updateItemsFocus(index){
    checkItem(`#code${index}`);
}

function checkItem(id){
    let items = document.querySelectorAll(".card");
    let item  = document.querySelector(id);
    uncheckItems(items);
    checkItemSpecific(item);
}

function checkItemSpecific(item){
    item.style.border = "thick solid #0000FF";
    item.scrollIntoView(); 
}

function uncheckItems(items){
    Array.from(items).forEach(item => {item.style.border = "0px solid #0000FF"});
}

// CONSTRUCT ITEM SPECIFIC

function viewItem(food,especificCard){
    let v = document.createElement("div");

    v.innerHTML = `<div>
    <h2>
        ${food.title}
    </h2>

    <div class="col-sm-12">
        <img src="${food.srcImagen}">
    </div>
    <h3 id="ingredients">Ingredientes</h3>

    <ul class="list-group">
        ${food.ingredients.map((ingredient)=> `<li class="list-group-item">${ingredient}</li>`).join(' ')}
    </ul>

    <h3 id="directions">Preparacion</h3>

    <ul class="list-group">
        ${food.directions.map((directions,index)=> `
        <li href="#" class="list-group-item list-group-item-action flex-column align-items-start" id="dir${index+1}">
        <small>${index+1}.</small>
        <p class="mb-1">${directions}</p>
        </li>`).join(' ')}
    </ul>
    </div>`;

    let view = v.childNodes[0];

    especificCard.appendChild(view);
}

function clearView(specificCard){
    while (specificCard.firstChild) {
        specificCard.firstChild.remove();
    }
}

function readStep(id){
    let dir = document.querySelector(id);
    if(dir !== undefined || dir !== null ){
        dir.scrollIntoView(); 
        let text = dir.lastElementChild.innerText;
        
        var msg = new SpeechSynthesisUtterance(text);
        var voices = window.speechSynthesis.getVoices();
        //console.log(window.SpeechSynthesis);
        //console.log(msg.voice);
        msg.lang = 'es-US'
        window.speechSynthesis.speak(msg);
    }
}