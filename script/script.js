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
	creaSchermataInizio()
	creaPagina()

	turno() //primo turno
	aggiungiIndizi(2) //aggiungo 2 indizi
}
