//
//variabili globali
//
const CARATTERI_SPECIALI = "!@#$%^&*()_+[]{}|;':\",.<>?/\\~`"
const CARATTERI = "abcdefghijklmnopqrstuvwxyzàèéìòù"

const MAX_TURNI = 5

var parolaCorretta = ""
var numeroLettere = 5
var turnoCorrente = 0
//
//
//
//funzione principale
async function iniziaGioco(n) {
	parolaCorretta = await scegliParolaCasuale(n)
	console.log(parolaCorretta)

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

async function caricaParole(nomeFile) {
	try {
		const risposta = await fetch(nomeFile)

		if (!risposta.ok) {
			throw new Error("Errore nel caricamento del file")
		}
		console.log("Caricamento avvenuto con successo")
		return await risposta.json()
	} catch (error) {
		console.error("Errore durante il caricamento del file")
		return null
	}
}

async function scegliParolaCasuale(n) {
	let chiave = n + "lettere"
	let parole = (await caricaParole("../parole.json"))[chiave]
	return parole[Math.floor(Math.random() * parole.length)]
}

function scegliIndiciCasuali(qta, parola) {
	let posizioniScelte = []
	for (let i = 0; i < qta; i++) {
		do {
			let posizioneCasuale = Math.floor(Math.random() * parola.length)
		} while (!posizioniScelte.includes(posizioneCasuale))
		posizioniScelte.push(posizioneCasuale)
	}
	return posizioniScelte
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
