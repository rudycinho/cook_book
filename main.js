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

    var foodArray = foods.map(() => true);

    var mainView = true;
    var flagDirections = false;
    var flagIngredients = false;

    var specificCard = document.querySelector('#specific-card');
    var viewCards = document.querySelector('#cards');

    var synt = window.speechSynthesis;

    create_items(foods);
    updateItemsFocus(index,false);


    if (annyang) {
        // Let's define a command.
        annyang.debug();
        annyang.setLanguage('es-US');

        var commands = {
            'sopas': function() { 
                if(mainView){
                    Array.from(viewCards.children).forEach(c =>  c.style.display = "none" );
                    Array.from(document.querySelectorAll(".sopa")).forEach(c => c.style.display = "block");

                    let arr = Array.from(document.querySelectorAll(".sopa")).map(c => `${c.id}`.replace('code',''));
                    console.log(arr);
                    index = Math.min(...arr); 
                    updateItemsFocus(index);

                    foodArray.fill(false);
                    arr.forEach(e => foodArray[parseInt(e)]=true);
                    console.log(foodArray);

                    Array.from(document.querySelectorAll(".sopa-aux")).forEach(c => c.style.display = "block");
                }
                flagDirections = false;
                flagIngredients = false;

            },
            'segundos': function() { 
                if(mainView){
                    Array.from(viewCards.children).forEach(c =>  c.style.display = "none" );
                    Array.from(document.querySelectorAll(".segundo")).forEach(c => c.style.display = "block");

                    let arr = Array.from(document.querySelectorAll(".segundo")).map(c => `${c.id}`.replace('code',''));
                    console.log(arr);
                    index = Math.min(...arr);
                    updateItemsFocus(index);

                    foodArray.fill(false);
                    arr.forEach(e => foodArray[parseInt(e)]=true);
                    console.log(foodArray);

                    Array.from(document.querySelectorAll(".segundo-aux")).forEach(c => c.style.display = "block");

                }
                flagDirections = false;
                flagIngredients = false;

            },
            'postres': function() { 
                if(mainView){
                    Array.from(viewCards.children).forEach(c =>  c.style.display = "none" );
                    Array.from(document.querySelectorAll(".postre")).forEach(c => c.style.display = "block");

                    let arr = Array.from(document.querySelectorAll(".postre")).map(c => `${c.id}`.replace('code',''));
                    console.log(arr);
                    index = Math.min(...arr);
                    updateItemsFocus(index);

                    foodArray.fill(false);
                    arr.forEach(e => foodArray[parseInt(e)]=true);
                    console.log(foodArray);

                    Array.from(document.querySelectorAll(".postre-aux")).forEach(c => c.style.display = "block");

                }
                flagDirections = false;
                flagIngredients = false;

            },
            'todos': function() { 
                if(mainView){
                    Array.from(viewCards.children).forEach(c =>  c.style.display = "block" );
                    index = 0
                    updateItemsFocus(index);

                    foodArray.fill(true);
                    console.log(foodArray);
                }
                flagDirections = false;
                flagIngredients = false;

            },
            'receta anterior': function() { 
                if(mainView){
                    //index = (index-1+size)%size; 
                    index = back(index,size,foodArray);
                    console.log(index);
                    updateItemsFocus(index);
                    console.log("anterior");
                }
                flagDirections = false;
                flagIngredients = false;

            },
            'receta siguiente' : function() { 
                if(mainView){
                    //index = (index+1)%size;
                    index = fordward(index,size,foodArray);
                    console.log(index);
                    updateItemsFocus(index);
                    console.log("siguiente");
                }
                flagDirections = false;
                flagIngredients = false;

            },
            'elegir' : function(){
                if(mainView){
                    
                    clearView(specificCard);
                    viewItem(foods[index],specificCard);
                    mainView = false;

                    viewCards.style.display = "none";
                    specificCard.style.display = "block"; 
                    //changeToForward();
                    document.querySelector(".text").scrollIntoView();
                }
                flagDirections = false;
                flagIngredients = false;

            },
            'atras' : function(){
                if(!mainView){
                    mainView=true;
                    viewCards.style.display = "block";
                    specificCard.style.display = "none"; 
                    //updateItemsFocus(index);

                }
                flagDirections = false;
                flagIngredients = false;
                

            },
            'ingredientes' : function(){
                if(!mainView){
                    document.querySelector('#ingredients').scrollIntoView(); 
                }
                flagDirections = false;
                flagIngredients = true;
            },
            'preparacion' : function(){
                if(!mainView){
                    document.querySelector('#directions').scrollIntoView(); 
                    flagDirections = true;
                    flagIngredients = false;
                }
            },
            'paso 1' : () => {if(!mainView && flagDirections) readStep('#dir1',synt)},
            'paso 2' : () => {if(!mainView && flagDirections) readStep('#dir2',synt)},
            'paso 3' : () => {if(!mainView && flagDirections) readStep('#dir3',synt)},
            'paso 4' : () => {if(!mainView && flagDirections) readStep('#dir4',synt)},
            'paso 5' : () => {if(!mainView && flagDirections) readStep('#dir5',synt)},
            'paso 6' : () => {if(!mainView && flagDirections) readStep('#dir6',synt)},
            'paso 7' : () => {if(!mainView && flagDirections) readStep('#dir7',synt)},
            'paso 8' : () => {if(!mainView && flagDirections) readStep('#dir8',synt)},
            'paso 9' : () => {if(!mainView && flagDirections) readStep('#dir9',synt)},
            'paso 10' : () => {if(!mainView && flagDirections) readStep('#dir10',synt)},
            'leer ingredientes' : () => {if(!mainView && flagIngredients) readIngredients(foods,index,synt)},
            
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

        c.innerHTML = `<div class="card ${food.category}" id="code${index}">
        <h5 class="card-header list-group-item list-group-item-action flex-column align-items-start">${food.title}</h5>
        <div class="row">
            <div class="col-sm-8">
                <div class="card-body">
                    <p class="card-text">${food.description}</p>
                    <!--<a href="#" class="btn btn-primary" onclick="">Ir a la receta</a>-->
                    <p class="card-text"><small class="text-muted">${food.time}</small></p>
                    <p class="card-text"><small class="text-muted">${food.portions} personas </small></p>
                </div>
            </div>
                
            <div class="col-sm-4">
                <img class="card-img-top" src=${food.srcImagen} width="200px" alt="Card image cap">
            </div>
        </div>            
    </div>
    `
        let card = c.childNodes[0];
        cards.appendChild(card);
        
        //cards.appendChild(document.createElement('hr'));

        let hr = document.createElement('hr');
        hr.classList.add(`${food.category}-aux`);
        cards.appendChild(hr);
    });
}

// CHECK ITEM

function updateItemsFocus(index,op=true){
    checkItem(`#code${index}`,op);
}

function checkItem(id,op){
    let items = document.querySelectorAll(".card");
    let item  = document.querySelector(id);
    uncheckItems(items);
    checkItemSpecific(item,op);
}

function checkItemSpecific(item,op){
    item.style.border = "thick solid #0000FF";
    if(op)
        item.scrollIntoView(); 
}

function uncheckItems(items){
    Array.from(items).forEach(item => {item.style.border = "0px solid #0000FF"});
}

// CONSTRUCT ITEM SPECIFIC

function viewItem(food,especificCard){
    let v = document.createElement("div");

    v.innerHTML = `<div>
    <h2 class="text">
        ${food.title}
    </h2>

    <div class="col-sm-12">
        <img src="${food.srcImagen}" class="img-item">
    </div>
    <h2 id="ingredients" class="text">Ingredientes</h2>

    <ul class="list-group">
        ${food.ingredients.map((ingredient)=> `<li class="list-group-item">${ingredient}</li>`).join(' ')}
    </ul>

    <h2 id="directions" class="text">Preparacion</h2>

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

function readStep(id,synt){
    let dir = document.querySelector(id);
    if(dir !== undefined && dir !== null ){
        dir.scrollIntoView(); 
        let text = dir.lastElementChild.innerText;
        
        let msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'es-US'
        synt.speak(msg);
    }
}

function readIngredients(foods,index,synt){
    let ingredientsText = foods[index].ingredients;
    let msg;
    ingredientsText.forEach(ingredient => {
        msg = new SpeechSynthesisUtterance(ingredient);
        msg.lang = 'es-US';
        synt.speak(msg);
    });
}

function fordward(index,size,foodArray){
    let i = index;
    console.log(`-> ${i}`)
    do{
        i = (i+1)%size;
        console.log(`> ${i}`)
        if(foodArray[i])
            break;
    }while(i!==index);

    return i;
}

function back(index,size,foodArray){
    let i = index;
    do{
        i = (i-1+size)%size;
        if(foodArray[i])
            break;
    }while(i!==index);

    return i;
}