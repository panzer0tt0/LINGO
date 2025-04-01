//
//variabili globali
//
const CARATTERI_SPECIALI = "!@#$%^&*()_+[]{}|;':\",.<>?/\\~`"
const CARATTERI = "abcdefghijklmnopqrstuvwxyzàèéìòù"

const MAX_TURNI = 5

var numeroLettere = 5
var turnoCorrente = 0
//
//
//
//funzione principale
function iniziaGioco(n) {
    turnoCorrente = 0
    if (n >= 4 && n <= 10) {
        numeroLettere = n
    } else {
        numeroLettere = 5
    }
    creaPagina()
    aggiungiEventListenerTastiera()

    turno() //primo turno
}

async function caricaFile(nomeFile) {
    try {
        const risposta = await fetch(nomeFile)

        if (!risposta.ok) {
            throw new Error("Errore nel caricamento del file")
        }
        console.log("Caricamento avvenuto con successo")
    } catch (error) {
        console.error("Errore durante il caricamento del file")
        return null
    }
}

function vaiAllaPagina() {
    let valore = document.querySelector("#numero").value
    window.location.href = "gioco.html?numero=" + valore
}
function tornaIndex(){
    window.location.href = "index.html"
}
function estraiNumero() {
    let parametri = new URLSearchParams(window.location.search)
    let numero = parseInt(parametri.get("numero"))
    if (isNaN(numero)) {
        numero = 5
    }
    return numero
}
