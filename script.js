const tempoGuardado = window.localStorage.getItem("tempo");

const cards = document.querySelectorAll(".carta");

if (tempoGuardado) { 
    document.getElementById("tempo").innerHTML = "Melhor tempo: " + msToTime(tempoGuardado); 
} else { 
    document.getElementById("tempo").innerHTML = "Primeiro jogo"; 
}

let comeco;

const cardBoard = document.querySelector(".cardboard");

const imgs = [    
    'img-1.png',
    'img-2.png',
    'img-3.png',
    'img-4.png',
    'img-5.png',
    'img-6.png',
    'img-7.png',
    'img-8.png'
];

let cardHTML = ""; 

let fcard, scard;

imgs.forEach(img => {  
    cardHTML += `
        <div class="carta" id="${img}">
            <img class="front" src="img/${img}">
            <img class="back" src="img/verso.png">
        </div>
    `;
});

cardBoard.innerHTML = cardHTML + cardHTML;

let block = false;

function mudarCarta() {

    if (block) return false;
    this.classList.add("flip");

    if (!fcard) {
        fcard = this;
        return false;
    }

    scard = this;

    checarCarta();

}


function checarCarta() {

    let igual = fcard.id === scard.id;

    if (!igual) {
        desabilitarCarta();
    } else {
        limparCarta(igual);
    } 

} 

function desabilitarCarta() {

    block = true;
    
    setTimeout(() => {

        fcard.classList.remove("flip");
        scard.classList.remove("flip");
        limparCarta();
    
    }, 1000);

}

let aleatorio = () => embaralhar(cardBoard.children);

function embaralhar(a) {

    comeco = Date.now();
    
    for (let card of a) {

        card.addEventListener("click", mudarCarta);

        card.classList.add("flip");

        setTimeout(() => {
        
            card.classList.remove("flip");

        }, 2000);
    
    }

    for (let i = a.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * i);
        
        trocarImgPosCartas(a, i, j);

    }

}

let trocarImgPosCartas = (a, index1, index2) => {

    [a[index1].id, a[index2].id] = [a[index2].id, a[index1].id];
    [a[index1].children[0].src, a[index2].children[0].src] = [a[index2].children[0].src, a[index1].children[0].src]

};

function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

function limparCarta(igual = false) {

    if (igual) {
        
        fcard.removeEventListener("click", mudarCarta);
        scard.removeEventListener("click", mudarCarta);

        checarJogoGanho();
        
    }

    [fcard, scard, block] = [null, null, false];

}

let checarJogoGanho = () => {

    let listaTodos = [];
    
    for (let card of cardBoard.children) {
        if (card.className == "carta flip") listaTodos.push(card);
    }

    if (listaTodos.length == 16) {
        ganharJogo();
    }

}

function ganharJogo() {

    let fim = Date.now() - comeco;

    window.alert("Você ganhou! Pressione o botão de embaralhar para continuar! Tempo de conclusão: " + msToTime(fim));

    if (tempoGuardado == null || tempoGuardado > fim) {

        window.localStorage.setItem("tempo", fim);

        document.getElementById("tempo").innerHTML = "Melhor tempo: " + msToTime(fim);

    }

}

aleatorio();

