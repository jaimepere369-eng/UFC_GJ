let vidaTopuria = 100;
let vidaMakhachev = 100;
let juegoActivo = true;

function dañoAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function atacar(quien) {
    if (!juegoActivo) return;

    if (quien === "topuria") {
        let daño = dañoAleatorio(10, 20);
        vidaMakhachev -= daño;
        document.getElementById("log").innerHTML = 
            "Topuria conecta golpe y hace " + daño + " de daño!";
    } else {
        let daño = dañoAleatorio(8, 22);
        vidaTopuria -= daño;
        document.getElementById("log").innerHTML = 
            "Makhachev responde y hace " + daño + " de daño!";
    }

    actualizarVida();
    verificarGanador();
}

function actualizarVida() {
    document.getElementById("vidaTopuria").textContent = 
        vidaTopuria > 0 ? vidaTopuria : 0;
    document.getElementById("vidaMakhachev").textContent = 
        vidaMakhachev > 0 ? vidaMakhachev : 0;
}

function verificarGanador() {
    if (vidaTopuria <= 0) {
        document.getElementById("log").innerHTML += "<br>¡Makhachev gana!";
        juegoActivo = false;
    }
    if (vidaMakhachev <= 0) {
        document.getElementById("log").innerHTML += "<br>¡Topuria gana!";
        juegoActivo = false;
    }
}