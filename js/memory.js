let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer   ------FATTO--------
var interval;
var trovata = document.getElementsByClassName('find')
var vittoria = document.getElementById('modal')
var timer = document.getElementsByClassName('timer')[0]

console.log(vittoria)



//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame() -----Fatto-----
function rimuovi_classe(){
    vittoria.classList.remove('active');
    startGame()
}
function startGame(){
    clearInterval(interval); 
     
    
    var array_shuffle = shuffle(arrayAnimali);
    console.log(array_shuffle)
    let carte = document.getElementById('griglia')
    carte.innerHTML = '';
    for(let i = 0; i < 24; i++){    
        let box = document.createElement('div');
        let element = document.createElement('div');
        element.className = 'icon';
        
        carte.appendChild(box).appendChild(element)
        element.addEventListener('click',displayIcon)
        element.innerHTML = array_shuffle[i];
    }
    start_timer()
    
    
}
// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, -----FATTO-----
// pulisce tutti gli elementi che eventualmente contiene   ----FATTO------
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo ----FATTO----
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto




function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    let suono_click = new Audio('sound/sfx-pop.mp3')
    suono_click.play()
    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML && arrayComparison[0] != arrayComparison[1]) {  // MODIFICATO, PRIMA SI RISCONTRAVA UN BUG !
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
            let suono_coppia = new Audio('sound/sfx-piano-arpeggio.mp3')
            suono_coppia.play()
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli   -------HO MODIFICATO IL NOME DELL'ARRAY/VARIABILE
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < trovata.length; i++) {
                        trovata[i].classList.add("disabled");    //SOPRA NON ERA SPECIFICATO IL NOME CHE BISOGNAVA METTERE ALLA VARIABILE
                    }
                });
                arrayComparison = [];
               
            }, 700);
        }
    }
    victory()
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte -----FATTO-----
function victory(){
    if(trovata.length == 24){
        let suono_vittoria = new Audio('sound/sfx-victory1.mp3')
        suono_vittoria.play()
        clearInterval(interval)
        vittoria.classList.add('active');
        document.getElementById('tempoTrascorso').innerHTML = timer.innerHTML
        
    }
}


// una funzione che nasconde la modale alla fine e riavvia il gioco  

  // funzione rimuovi_classe()  -----FATTO----
  
  
// una funzione che calcola il tempo e aggiorna il contenitore sotto -----FATTO-----
function start_timer(){
    let sec = 0;
    let min = 0; 
    let ore = 0;
    interval = setInterval(function(){
    timer.innerHTML = 'Tempo: ' +(ore>9 ? ore: '0' + ore )+ ':'+ (min>9 ? min: '0' + min) +'.'+ (sec>9 ? sec: '0'+ sec) ;
      sec++;
      if(sec == 60){
        min++;
        sec = 0;
      }
      if(min == 60){
        ore++;
        min = 0;
      }
    },1000);
  }







  /* 
  
  
  
                    ______________
                  /       |         \          PEACE & LOVE <3
                 /        |          \
                |         |           |
                |         |           |
                |        / \          |
                |       / | \         |
                 \     /  |  \       /
                  \_ _/___|___\____ /
                     
  
  */
