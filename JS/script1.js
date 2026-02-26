let vidaTopuria = 100;
let vidaMakhachev = 100;
let turno = "topuria";
let enSuelo = false;
let juegoActivo = true;

function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function actualizarVida(){
    document.getElementById("vidaTopuria").textContent = vidaTopuria>0?vidaTopuria:0;
    document.getElementById("vidaMakhachev").textContent = vidaMakhachev>0?vidaMakhachev:0;
}

function accion(tipo){
    if(!juegoActivo || turno !== "topuria") return;

    if(!enSuelo){
        if(tipo==="ligero") golpeLigero("topuria");
        if(tipo==="pesado") golpePesado("topuria");
        if(tipo==="suelo") intentarDerribo("topuria");
    } else {
        accionSuelo("topuria");
    }

    actualizarVida();
    verificar();
    if(juegoActivo) turnoCPU();
}

function golpeLigero(quien){
    let daño = random(8,12);
    aplicarDaño(quien, daño);
    log("Golpe ligero conecta y hace "+daño+" de daño.");
}

function golpePesado(quien){
    let acierta = Math.random() < 0.6; // 60% acierto
    if(!acierta){
        log("¡Golpe pesado falla!");
        return;
    }

    let critico = Math.random() < 0.25; // 25% crítico
    let daño = random(15,25);

    if(critico){
        daño *= 2;
        log("¡CRÍTICO! 💥");
    }

    aplicarDaño(quien, daño);
    log("Golpe pesado conecta y hace "+daño+" de daño.");
}

function intentarDerribo(quien){
    let exito = Math.random() < 0.55; // 55% éxito
    if(exito){
        enSuelo = true;
        document.getElementById("estado").textContent="¡Están en el suelo!";
        log("Derribo exitoso.");
    } else {
        log("Intento de derribo fallido.");
    }
}

function accionSuelo(quien){
    let evento = Math.random();

    if(evento < 0.3){
        // Sumisión
        log("¡Sumisión lograda! 🔒");
        if(quien==="topuria") vidaMakhachev=0;
        else vidaTopuria=0;
    }
    else if(evento < 0.6){
        // Escape
        enSuelo=false;
        document.getElementById("estado").textContent="Vuelven de pie.";
        log("¡Se escapa y vuelven a pelear de pie!");
    }
    else{
        // Ground & pound
        let daño=random(10,18);
        aplicarDaño(quien,daño);
        log("Ground & Pound hace "+daño+" de daño.");
    }
}

function aplicarDaño(quien,daño){
    if(quien==="topuria") vidaMakhachev-=daño;
    else vidaTopuria-=daño;
}

function turnoCPU(){
    turno="makhachev";

    setTimeout(()=>{
        if(!enSuelo){
            let eleccion=random(1,3);
            if(eleccion===1) golpeLigero("makhachev");
            if(eleccion===2) golpePesado("makhachev");
            if(eleccion===3) intentarDerribo("makhachev");
        } else {
            accionSuelo("makhachev");
        }

        actualizarVida();
        verificar();
        turno="topuria";
    },1000);
}

function verificar(){
    if(vidaTopuria<=0){
        log("¡Makhachev gana!");
        juegoActivo=false;
    }
    if(vidaMakhachev<=0){
        log("¡Topuria gana!");
        juegoActivo=false;
    }
}

function log(texto){
    document.getElementById("log").innerHTML=texto;
}