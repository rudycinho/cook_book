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
    
    create_items(foods);
    updateItemsFocus(index);


    if (annyang) {
        // Let's define a command.
        annyang.debug();
        annyang.setLanguage('es-US');

        var commands = {
            'anterior': function() { 
                index = (index-1+size)%size; 
                updateItemsFocus(index)
            },
            'siguiente' : function() { 
                index = (index+1)%size;
                updateItemsFocus(index)
            },
            'entrar' : function(){
                console.log(index);
                location.href = 'https://www.youtube.com/watch?v=fT0BDZWj6Xk&list=RDHBnMQFabTP4&index=19';
            }
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
    console.log(id);
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

/*
function draw_item(){
    let v = document.createElement("div");

    v.innerHTML = `<div>
    <h2>
        ${foods[i].title}
    </h2>
    <h3>Ingrediente</h3>

    <ul class="list-group">
        ${foods[i].ingredients.map((ingredient)=> `<li class="list-group-item">${ingredient}</li>`).join(' ')}
        
                    
    </ul>

    <h3>Preparacion</h3>

    <ul class="list-group">
        ${foods[i].directions.map((directions,index)=> `
        <li href="#" class="list-group-item list-group-item-action flex-column align-items-start">
        <small>${index+1}.</small>
        <p class="mb-1">${directions}</p>
        
        </li>`).join(' ')}
        

    </ul>
    </div>`;

    let view = v.childNodes[0];

    especificCard.appendChild(view);
}
*/
function view_item(food,especificCard){
    let v = document.createElement("div");

    v.innerHTML = `<div>
    <h2>
        ${food.title}
    </h2>
    <h3>Ingrediente</h3>

    <ul class="list-group">
        ${food.ingredients.map((ingredient)=> `<li class="list-group-item">${ingredient}</li>`).join(' ')}
    </ul>

    <h3>Preparacion</h3>

    <ul class="list-group">
        ${food.directions.map((directions,index)=> `
        <li href="#" class="list-group-item list-group-item-action flex-column align-items-start">
        <small>${index+1}.</small>
        <p class="mb-1">${directions}</p>
        </li>`).join(' ')}
    </ul>
    </div>`;

    let view = v.childNodes[0];

    especificCard.appendChild(view);
}