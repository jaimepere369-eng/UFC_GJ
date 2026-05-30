let vidaTopuria = 100;
let vidaMakhachev = 100;

const barraTopuria = document.getElementById("barraTopuria");
const barraMakhachev = document.getElementById("barraMakhachev");
const estado = document.getElementById("estado");
const log = document.getElementById("log");

// Inicializar barras
actualizarBarras();

function actualizarBarras() {
    barraTopuria.style.width = vidaTopuria + "%";
    barraMakhachev.style.width = vidaMakhachev + "%";
}

// Función principal de acción
function accion(tipo) {

    if (vidaTopuria <= 0 || vidaMakhachev <= 0) {
        estado.innerHTML = "La pelea ha terminado.";
        return;
    }

    let atacante = Math.random() < 0.5 ? "Topuria" : "Makhachev";
    let defensor = atacante === "Topuria" ? "Makhachev" : "Topuria";
    let daño = 0;

    if (tipo === "ligero") {

        daño = Math.floor(Math.random() * 10) + 5;

        if (atacante === "Topuria") {
            vidaMakhachev -= daño;
        } else {
            vidaTopuria -= daño;
        }

        log.innerHTML = "👊 " + atacante + " conecta golpe ligero y hace " + daño + " de daño.";

    } 
    else if (tipo === "pesado") {

        daño = Math.floor(Math.random() * 20) + 10;

        if (atacante === "Topuria") {
            vidaMakhachev -= daño;
        } else {
            vidaTopuria -= daño;
        }

        log.innerHTML = "💥 " + atacante + " lanza golpe pesado y hace " + daño + " de daño.";

    } 
    else if (tipo === "suelo") {

        log.innerHTML = "🤼 " + atacante + " intenta derribo... ¡Se van al suelo!";

        let probabilidad = Math.random();

        // 15% SUMISIÓN
        if (probabilidad < 0.15) {
            
            if (atacante === "Topuria") {
                vidaMakhachev = 0;
            } else {
                vidaTopuria = 0;
            }

            actualizarBarras();
            verificarGanador("sumision");
            return;

        }
        // 60% HUIDA
        else if (probabilidad < 0.75) {

            log.innerHTML += "<br>💨 ¡" + defensor + " logra escapar rápidamente!";

        }
        // 25% CONTROL EN EL SUELO
        else {

            daño = Math.floor(Math.random() * 12) + 6;

            if (atacante === "Topuria") {
                vidaMakhachev -= daño;
            } else {
                vidaTopuria -= daño;
            }

            log.innerHTML += "<br>🔒 " + atacante + " domina en el suelo y hace " + daño + " de daño.";

        }
    }

    if (vidaTopuria < 0) vidaTopuria = 0;
    if (vidaMakhachev < 0) vidaMakhachev = 0;

    actualizarBarras();
    verificarGanador();
}

function verificarGanador(tipoVictoria = "KO") {

    if (vidaTopuria <= 0) {

        if (tipoVictoria === "sumision") {
            estado.innerHTML = "🏆 ¡Makhachev gana por SUMISIÓN!";
        } else {
            estado.innerHTML = "🏆 ¡Makhachev gana por KO!";
        }

        botonReiniciar.style.display = "inline-block";
    } 
    else if (vidaMakhachev <= 0) {

        if (tipoVictoria === "sumision") {
            estado.innerHTML = "🏆 ¡Topuria gana por SUMISIÓN!";
        } else {
            estado.innerHTML = "🏆 ¡Topuria gana por KO!";
        }

        botonReiniciar.style.display = "inline-block";
    }
}

// Función para reiniciar el juego
const botonReiniciar = document.getElementById("reiniciar");

function reiniciarJuego() {

    vidaTopuria = 100;
    vidaMakhachev = 100;

    actualizarBarras();

    estado.innerHTML = "";
    log.innerHTML = "";

    botonReiniciar.style.display = "none";
}