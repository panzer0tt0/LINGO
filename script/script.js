//
// variabili globali
//
const CARATTERI_SPECIALI = "!@#$%^&*()_+[]{}|;':\",.<>?/\\~`"
const CARATTERI = "abcdefghijklmnopqrstuvwxyzàèéìòù"

const MAX_TURNI = 5

const PUNTI_BASE = 10
const MOLTIPLICATORE = [0, 3, 3, 2, 2, 1] // moltiplicatore per i punti in base al turno corrente

var tempoTimer = 60 // tempo default del timer in secondi
var difficolta = "normale" // difficoltà di default

var parolaCorretta = ""
var numeroLettere = 5
var turnoCorrente = 0
var punti = 0
var timer = null // variabile per identificare il timer
//
//
//
// funzione principale
async function iniziaGioco(arg) {
	let n
	let d
	if (!arg) {
		n = numeroLettere
		d = difficolta
	} else {
		n = arg.numero
		d = arg.difficolta
	}

	let numeroIndizi = 0

	switch (d) {
		case "facile":
			tempoTimer = 120
			numeroIndizi = 2
			break
		case "normale":
			tempoTimer = 60
			numeroIndizi = 1
			break
		case "difficile":
			tempoTimer = 30
			numeroIndizi = 0
			break
		default:
			tempoTimer = 60
			numeroIndizi = 1
			break
	}
	difficolta = d

	turnoCorrente = 0
	if (n >= 4 && n <= 10) {
		numeroLettere = n
	} else {
		numeroLettere = 5
	}
	parolaCorretta = await scegliParolaCasuale(numeroLettere)
	console.log(parolaCorretta)

	creaSchermataInizio()
	creaPagina()

	turno() //primo turno
	aggiungiIndizi(numeroIndizi) //aggiungo gli indizi
}
