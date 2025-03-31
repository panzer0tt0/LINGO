var numeroLettere = 5
var turnoCorrente = 0

function iniziaGioco(numLettere) {
	aggiungiEventListenerTastiera()

	let iniziaGioco = alert("Vuoi iniziare il gioco?")

	turnoCorrente = 0
	if (numLettere >= 4 && numLettere <= 10) {
		numeroLettere = numLettere
	} else {
		numeroLettere = 5
	}
	let areaGioco = document.querySelector("#areaGioco")
	areaGioco.innerHTML = ""

	let griglia = creaGriglia(numeroLettere, MAX_TURNI)
	areaGioco.appendChild(griglia)
	areaGioco.appendChild(bottoneProssimoTurno)
	let bottoneProssimoTurno = document.createElement("button")
	bottoneProssimoTurno.type = "button"
	bottoneProssimoTurno.innerHTML = "Prossimo turno"
	bottoneProssimoTurno.onclick = () => {
		prossimoTurno()
	}
	areaGioco.appendChild(bottoneProssimoTurno)

	turno()
}

function risolviParola() {
	let ris = ""
	for (let i = 0; i < numeroLettere; i++) {
		let cella = document.querySelector("#campo" + turnoCorrente + "-" + i)
		if (!cella.value || cella.value == " " || cella.value.length != 1 || CARATTERI_SPECIALI.includes(cella.value)) {
			ris = false
		} else {
			ris += cella.value
		}
	}
	return ris
}

function turno(parola) {
	aggiornaCaselle()
	let vinto = controllaParola(parola)
	setTimeout(() => {
		if (vinto) {
			alert("Hai indovinato la parola!")
			iniziaGioco(numeroLettere)
		}
		if (turnoCorrente >= MAX_TURNI) {
			alert("Hai esaurito i turni!")
			iniziaGioco(numeroLettere)
		}
	})
}

const PAROLA_CORRETTA = "casa" //temporanea
function controllaParola(parola) {
	let turnoPrecedente = turnoCorrente - 1
	let caratteriCorretti = 0
	for (let i = 0; i < parola.length; i++) {
		let carattere = parola[i]
		if (carattere == PAROLA_CORRETTA[i]) {
			caratteriCorretti++
			document.querySelector("#cella" + turnoPrecedente + "-" + i).style.backgroundColor = "green"
		} else if (PAROLA_CORRETTA.includes(carattere)) {
			document.querySelector("#cella" + turnoPrecedente + "-" + i).style.backgroundColor = "yellow"
		}
	}
	return caratteriCorretti == parola.length
}

function aggiornaCaselle() {
	for (let i = 0; i < MAX_TURNI; i++) {
		if (i != turnoCorrente) {
			for (let j = 0; j < numeroLettere; j++) {
				document.querySelector("#campo" + i + "-" + j).disabled = true
			}
		} else {
			for (let j = 0; j < numeroLettere; j++) {
				document.querySelector("#campo" + i + "-" + j).disabled = false
			}
			document.querySelector("#campo" + i + "-0").focus()
		}
	}
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

function prossimoTurno() {
	let parola = risolviParola()
	if (parola) {
		turnoCorrente++
		turno(parola)
	} else {
		alert("Parola non valida!")
	}
}

function vaiAllaPagina() {
	let valore = document.querySelector("#numero").value
	window.location.href = "index.html?numero=" + valore
}
