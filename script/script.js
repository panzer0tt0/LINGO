//
// variabili globali
//
const CARATTERI_SPECIALI = "!@#$%^&*()_+[]{}|;':\",.<>?/\\~`"
const CARATTERI = "abcdefghijklmnopqrstuvwxyzàèéìòù"

const MAX_TURNI = 5

const PUNTI_BASE = 10
const MOLTIPLICATORE = [0, 3, 3, 2, 2, 1] // moltiplicatore per i punti in base al turno corrente

var tempoTimer = 60 // tempo default del timer in secondi

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
	let n = arg.numero
	let difficolta = arg.difficolta

	let numeroIndizi = 0

	switch (difficolta){
		case "facile":
			tempoTimer = 60
			numeroIndizi = 2
			break
		case "normale":
			tempoTimer = 30
			numeroIndizi = 1
			break
		case "difficile":
			tempoTimer = 15
			numeroIndizi = 0
			break
		default:
			tempoTimer = 60
			numeroIndizi = 2
			break
	}
	parolaCorretta = await scegliParolaCasuale(n)
	console.log(parolaCorretta)

	turnoCorrente = 0
	if (n >= 4 && n <= 10) {
		numeroLettere = n
	} else {
		numeroLettere = 5
	}
	creaSchermataInizio()
	creaPagina()

	turno() //primo turno
	aggiungiIndizi(numeroIndizi) //aggiungo gli indizi
}
