document.addEventListener("keydown", (event) => {
	if (event.key === "Backspace" && event.target.tagName === "INPUT" && event.target.value === "") {
		let currentId = event.target.id
		let [prefix, rowCol] = currentId.split("campo")
		let [row, col] = rowCol.split("-")
		let prevCol = parseInt(col) - 1
		let prevInput = document.querySelector(`#campo${row}-${prevCol}`)
		if (prevInput) {
			prevInput.focus()
		}
	} else if (event.key !== "Backspace" && event.target.tagName === "INPUT" && event.target.value !== "") {
		let currentId = event.target.id
		let [prefix, rowCol] = currentId.split("campo")
		let [row, col] = rowCol.split("-")
		let nextCol = parseInt(col) + 1
		let nextInput = document.querySelector(`#campo${row}-${nextCol}`)
		if (nextInput) {
			nextInput.focus()
		}
	}
})

function creaGriglia(larghezza, altezza) {
	if (larghezza < 1 || altezza < 1) {
		alert("Larghezza e altezza devono essere maggiori di 0")
		return
	}
	let griglia = document.createElement("table")
	griglia.id = "griglia"
	griglia.innerHTML = ""
	for (let i = 0; i < altezza; i++) {
		let riga = document.createElement("tr")
		for (let j = 0; j < larghezza; j++) {
			let cella = creaCella(i + "-" + j)
			riga.appendChild(cella)
		}
		griglia.appendChild(riga)
	}

	return griglia
}

function creaCella(id) {
	let cella = document.createElement("td")
	cella.id = "cella" + id
	let campo = document.createElement("input")
	campo.type = "text"
	campo.id = "campo" + id
	campo.maxLength = 1
	campo.placeholder = campo.id
	campo.disabled = true
	cella.appendChild(campo)
	return cella
}

const MAX_TURNI = 5

function loopGioco(numeroLettere) {
	let turnoCorrente = 0

	let areaGioco = document.querySelector("#areaGioco")
	areaGioco.innerHTML = ""

	let griglia = creaGriglia(numeroLettere, MAX_TURNI)
	areaGioco.appendChild(griglia)

	let iniziaGioco = confirm("Vuoi iniziare il gioco?")
	if (!iniziaGioco) {
		return
	}
	turno(turnoCorrente, numeroLettere)

	let bottoneProssimoTurno = document.createElement("button")
	bottoneProssimoTurno.type = "button"
	bottoneProssimoTurno.innerHTML = "Prossimo turno"
	bottoneProssimoTurno.onclick = () => {
		console.log("Prossimo turno clicked")
		turnoCorrente++
		turno(turnoCorrente, numeroLettere)
	}
	areaGioco.appendChild(bottoneProssimoTurno)
}

function turno(turnoCorrente, numeroLettere) {
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
