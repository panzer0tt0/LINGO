function turno() {
	if (timer) {
		clearInterval(timer)
		iniziaTimer()
	}
	console.log("turno " + turnoCorrente)
	if (turnoCorrente == 0) {
		//quello che accade finche' non si schiaccia per la prima volta il bottone prossimo turno (o si preme invio)
		aggiornaCaselle()
		turnoCorrente = 1
	} else {
		//flow normale del gioco
		let parola = risolviParola()
		if (parola) {
			let vinto = controllaParola(parola)
			if (vinto) {
				punti = PUNTI_BASE * MOLTIPLICATORE[turnoCorrente]
				console.log(punti)
				rimuoviEventListenerTastiera() //per evitare di passare al turno successivo schiacciando enter durante l'alert
				clearInterval(timer)
				timer = null
				creaSchermataVittoria()
			} else if (turnoCorrente >= MAX_TURNI) {
				rimuoviEventListenerTastiera()
				creaSchermataSconfitta()
			} else {
				for (let i = 0; i < numeroLettere; i++) {
					let campo = document.querySelector("#campo" + (turnoCorrente - 1) + "-" + i)
					if (campo.className == "giusta") {
						let campoSuccessivo = document.querySelector("#campo" + turnoCorrente + "-" + i)
						campoSuccessivo.value = campo.value
						campoSuccessivo.disabled = true
						campoSuccessivo.className = "giusta"
					}
				}
			}

			aggiornaCaselle()
			turnoCorrente++
		} else {
			alert("Parola non valida!")
		}
	}
}

//prende il valore delle caselle e lo restituisce come stringa
function risolviParola() {
	let ris = ""
	let turnoPrecedente = turnoCorrente - 1
	for (let i = 0; i < numeroLettere; i++) {
		let cella = document.querySelector("#campo" + turnoPrecedente + "-" + i)
		if (
			cella.value &&
			cella.value != " " &&
			cella.value.length == 1 &&
			CARATTERI.toLowerCase().includes(cella.value.toLowerCase())
		) {
			ris += cella.value
		} else {
			ris = false
			break
		}
	}
	console.log(ris)

	return ris
}

function controllaParola(parola) {
	let turnoPrecedente = turnoCorrente - 1
	let caratteriCorretti = 0

	for (let i = 0; i < parola.length; i++) {
		let carattere = parola[i]
		if (carattere == parolaCorretta[i]) {
			caratteriCorretti++
			document.querySelector("#campo" + turnoPrecedente + "-" + i).className = "giusta"
		} else if (
			parolaCorretta.includes(carattere) &&
			parolaCorretta.calcolaRicorrenza(carattere) >= parola.calcolaRicorrenza(carattere)
		) {
			document.querySelector("#campo" + turnoPrecedente + "-" + i).className = "parziale"
		}
	}
	return caratteriCorretti == parola.length
}

//aggiungo un metodo alla classe String per calcolare la ricorrenza di un carattere in una stringa
String.prototype.calcolaRicorrenza = function (carattere) {
	let i = 0
	for (let c of this) {
		if (c == carattere) {
			i++
		}
	}
	return i
}
