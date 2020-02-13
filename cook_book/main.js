/*const foods = [
    {
        title : "Pique Macho",
        portions : 2,
        time:"40",
        description : "Pique macho o pique a lo macho es un plato típico de Bolivia. Es un plato consistente en trozos de carne de vaca y patatas fritas. También se le añade cebolla, locoto, huevos duros, mostaza, mayonesa y kétchup.",
        srcImagen : "piquemacho-boliviano-foto-principal.jpg",
        ingredients: [
            '1/2 kg carne entera',
            '1/4 kg choricillo',
            '3 huevos',
            '2 tomates',
            '1/2 kg papa',
            '2 locotos (aji)',
            '1/2 pimenton',
            '1/4 queso',
            '1 cebolla mediana' 
        ],
        directions: [
            'Cortar la carne en trozos largos y pequeños, sazonar con sal y una pizca de pimienta. Reposar',
            'En una olla con agua poner los huevos hasta q esten cocidos y duros, pelar las papas y fritarlas en aceite caliente.',
            `Lavar los tomates junto con el locoto, cebolla y el pimenton, cortar en tiras largas y dejar apartados en una fuente hasta que se los incorpore.
            Picar el queso en rodajas alargadas.`,
            `En un sarten con teflon poner un chorrito de aceite y agregar la carne junto con los choricillos y el locoto.
            Agregar media taza de agua, sazonar a gusto.`,
            'Una vez veamos q la carne esta listo apagamos y se mezcla con las papas fritas, la cebolla y el pimenton.',
            'Servimos en una fuente y agregamos encima los dos tomates cortados en rodajas largas,los huevos partidos y el queso en rodajas largas.'
        ] 
    },
    {
        title : "Papas ala huancaina Bolivia",
        portions : 4,
        time:"30 minutos",
        description : "La papa a la huancaína es un plato típico de la costa y sierra central del Perú que, junto al ceviche, es uno de los productos gastronómicos más populares y representativos de este país.",
        srcImagen : "papas-ala-huancaina-bolivia-foto-principal.jpg",
        ingredients: [
            '8 Papas blancas cocidas',
            '1 puñado mani pelado',
            'aji colorado o colorante',
            '1 cebolla pequeña',
            '1 chorro leche',
            'lechuga',
            'tomate',
            'queso',
            'aceitunas negras',
            'huevo duro ' 
        ],
        directions: [
            'Se pone a cocer las papas. Se lavan y desinfectan las verduras. El huevo duro lo cortamos al esilo de su preferencia. El queso en lonjas.',
            `Para la salsa de maní:
            Se pica la cebolla y se licua junto con el maní y el chorro de leche, hasta conseguir una pasta que este ni muy espesa ni muy liquida. Si queremos se puede poner un poco de agua para los que desean que el sabor de la leche sea mas sutil.`,
            'Luego se vacia a una olla se pone sal, pimienta y colorante al gusto. Se lo pone a cocer por un minuto (removiendo para que no se pegue ni se queme) y LISTO!!!',
            `El armado del plato:
            Primero las lechugas en hoja encima dos papas, sobre las papas se vacia la salsa de maní, luego se adorna con el tomate en rodajas el queso y las aceitunas.`

        ]  
    },
    {
        title : "Chank’a de pollo",
        portions : 4,
        time:"Variado",
        description : "Es una sopa muy deliciosa e ideal cuando hace frío o si uno no se siente muy bien de salud ya que es una “sopita blanca” .",
        srcImagen : "chanka-de-pollo-foto-principal.jpg",
        ingredients: [
            '1 pechuga de pollo',
            '1 taza habas',
            '1 cebollín',
            '2 zanahorias pequeñas',
            '1 cda sal',
            '4 papas',
            '4 tazas agua', 
        ],
        directions: [
            'En una olla mediana hacer hervir el agua con sal y el pollo trozado en 4 piezas',
            'Cuando el pollo esté casi cocido añadir las papas peladas y cortadas por la mitad',
            'Pelar y picar la zanahoria en bastones largos. Pelar las habas. Incorporar a la olla. Otra opción es hacer cocer a parte.',
            'Lavar bien el cebollín (hojas verdes y largas de la cabeza de la cebolla) y cortar en tiras largas. Hacer hervir en una olla aparte por unos minutos y apartar para el momento de servir. (Este ingrediente es opcional en la sopa)'
        ]    
    }
];*/

fetch("foods.json")
  .then(response => response.json())
  .then(json => console.log(json));



var i=0;
var cards = document.querySelector("#cards");
var especificCard = document.querySelector("#specific-card");

draw_items();
draw_item();

function draw_items(){
    foods.forEach((food,index) => {
        let c = document.createElement("div");

        c.innerHTML = `<div class="card" id="c${index}">
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

function updateItemsFocus(){
    var listItems = document.querySelectorAll(".card");
    for(l in listItems){
        l.style.border = "0px solid #0000FF";
    }
    
    //console.log(listItems);
    let index = 0;
    document.querySelector(`#c${i}`).style.border = "thick solid #0000FF";

    if(index==3)
        index=0;
}



if (annyang) {
    // Let's define a command.
    var commands = {
      'a': function() { 
            i--; 
            console.log(i);
            updateItemsFocus()
        },
      'c' : function() { 
            i++;
            console.log(i);
            updateItemsFocus()
        }
    };
  
    // Add our commands to annyang
    annyang.addCommands(commands);
  
    // Start listening.
    annyang.start();
  }