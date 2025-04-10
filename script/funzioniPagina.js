function aggiungiEventListenerTastiera() {
	document.addEventListener("keydown", eventoTastiera)
}
function rimuoviEventListenerTastiera() {
	document.removeEventListener("keydown", eventoTastiera)
}

function eventoTastiera(event) {
	if (event.key === "Backspace" && event.target.tagName === "INPUT" && event.target.value === "") {
		let currentId = event.target.id
		let [prefix, rowCol] = currentId.split("campo")
		let [row, col] = rowCol.split("-")
		let prevCol = parseInt(col) - 1
		let prevInput = document.querySelector(`#campo${row}-${prevCol}`)
		while (prevInput && prevInput.className == "giusta") {
			prevCol--
			prevInput = document.querySelector(`#campo${row}-${prevCol}`)
		}
		if (prevInput) {
			prevInput.focus()
		}
	} else if (CARATTERI.includes(event.key) && event.target.tagName === "INPUT" && event.target.value !== "") {
		let currentId = event.target.id
		let [prefix, rowCol] = currentId.split("campo")
		let [row, col] = rowCol.split("-")
		let nextCol = parseInt(col) + 1
		let nextInput = document.querySelector(`#campo${row}-${nextCol}`)
		while (nextInput && nextInput.className == "giusta") {
			nextCol++
			nextInput = document.querySelector(`#campo${row}-${nextCol}`)
		}
		if (nextInput) {
			nextInput.value = event.key
			nextInput.focus()
		}
	} else if (event.key === "Enter") {
		turno()
	}
}

function creaPagina() {
	let areaGioco = document.querySelector("#areaGioco")
	areaGioco.innerHTML = ""

	let griglia = creaGriglia(numeroLettere, MAX_TURNI)
	areaGioco.appendChild(griglia)
	let bottoneProssimoTurno = document.createElement("button")
	bottoneProssimoTurno.type = "button"
	bottoneProssimoTurno.innerHTML = "Prossimo turno"
	bottoneProssimoTurno.onclick = () => {
		turno()
	}
	areaGioco.appendChild(bottoneProssimoTurno)
}

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

//rende disabled le caselle degli altri turni e abilitata solo quelle del turno corrente
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

function vaiAllaPagina() {
	let valore = document.querySelector("#numero").value
	window.location.href = "gioco.html?numero=" + valore
}
function tornaIndex() {
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
function pubblicita() {
	document.querySelector("#overlay").style.display = "flex"
}

function nascondiPopup() {
	document.querySelector("#overlay").style.display = "none"
}

function cambiaImmagine() {
	let immagini = ["immagine1.jpg", "immagine2.jpg", "immagine3.jpg"]
	let immagineCasuale = immagini[Math.floor(Math.random() * immagini.length)]
	document.querySelector("#ad").src = immagineCasuale
}
