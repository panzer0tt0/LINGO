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

function scegliIndiciCasuali(qta, parola, indiciEsclusi) {
	let posizioniScelte = []
	let posizioneCasuale = 0
	for (let i = 0; i < qta; i++) {
		do {
			posizioneCasuale = Math.floor(Math.random() * parola.length)
		} while (posizioniScelte.includes(posizioneCasuale) || indiciEsclusi.includes(posizioneCasuale))
		posizioniScelte.push(posizioneCasuale)
	}
	return posizioniScelte
}

function aggiungiIndizi(qta) {
	let indiciCampiGiusti = []
	let turnoPrecedente = turnoCorrente - 1
	for (let i = 0; i < numeroLettere; i++) {
		let campo = document.querySelector("#campo" + turnoPrecedente + "-" + i)
		if (campo.className == "giusta") {
			indiciCampiGiusti.push(i)
		}
	}
	let indici = scegliIndiciCasuali(qta, parolaCorretta, indiciCampiGiusti)
	for (let i = 0; i < indici.length; i++) {
		let campo = document.querySelector("#campo" + turnoPrecedente + "-" + indici[i])
		campo.value = parolaCorretta[indici[i]]
		campo.disabled = true
		campo.className = "giusta"
	}
}
