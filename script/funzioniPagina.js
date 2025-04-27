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

	let barraTimer = document.createElement("div")
	barraTimer.id = "barraTimer"
	let barraTimerInterna = document.createElement("div")
	barraTimerInterna.id = "barraTimerInterna"
	barraTimer.appendChild(barraTimerInterna)
	areaGioco.appendChild(barraTimer)

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
	let difficolta = document.querySelector("#difficolta").value
	window.location.href = "gioco.html?numero=" + valore + "&difficolta=" + difficolta
}
function tornaIndex() {
	window.location.href = "index.html"
}
function estraiArgomenti() {
	let parametri = new URLSearchParams(window.location.search)
	let numero = parseInt(parametri.get("numero"))
	let difficolta = parametri.get("difficolta")
	if (isNaN(numero) ) {
		numero = 5
	}
	return {numero, difficolta}
}
function mostraPopup(id) {
	document.querySelector("#" + id).style.display = "flex"
}

function nascondiPopup(id) {
	document.querySelector("#" + id).style.display = "none"
}

function cambiaImmagine() {
	let immagini = ["immagine1.jpg", "immagine2.jpg", "immagine3.jpg", "immagine4.jpg"]
	let immagineCasuale = immagini[Math.floor(Math.random() * immagini.length)]
	document.querySelector("#ad").src = immagineCasuale
}

function creaPopup(id, contenuti) {
	let popup = document.createElement("div")
	popup.id = id
	popup.className = "popup"
	for (let contenuto of contenuti) {
		popup.appendChild(contenuto)
	}
	return popup
}

function creaPubblicita() {
	let bottoneChiudi = document.createElement("button")
	bottoneChiudi.innerHTML = "X"
	bottoneChiudi.id = "bottoneChiudiPopup"
	bottoneChiudi.onclick = () => {
		nascondiPopup("pubblicita")
	}
	let immagine = document.createElement("img")
	immagine.id = "ad"
	immagine.src = ""
	immagine.alt = "Pubblicità"

	let pubblicita = creaPopup("pubblicita", [bottoneChiudi, immagine])
	document.body.appendChild(pubblicita)
}

function creaSchermataInizio() {
	let s = document.querySelector("#schermataInizio")
	if (s) {
		s.remove()
	}
	let div = document.createElement("div")
	div.id = "divSchermataInizio"
	div.className = "schermataInizio"
	let titolo = document.createElement("h1")
	titolo.innerHTML = "Benvenuto su LINGO"
	let sottotitolo = document.createElement("h2")
	sottotitolo.innerHTML = "Sei pronto a giocare?"
	let iniziaGioco = document.createElement("button")
	iniziaGioco.innerHTML = "Inizia il gioco"
	iniziaGioco.onclick = () => {
		nascondiPopup("schermataInizio")
		aggiungiEventListenerTastiera()
		iniziaTimer()
	}
	div.appendChild(titolo)
	div.appendChild(sottotitolo)
	div.appendChild(iniziaGioco)
	let schermataInizio = creaPopup("schermataInizio", [div])
	document.body.appendChild(schermataInizio)
}

function creaSchermataVittoria() {
	let s = document.querySelector("#schermataVittoria")
	if (s) {
		s.remove()
	}
	let div = document.createElement("div")
	div.id = "divSchermataVittoria"
	let titolo = document.createElement("h1")
	titolo.innerHTML = "Hai vinto!"
	let sottotioloPunti = document.createElement("h2")
	sottotioloPunti.innerHTML = "Punti: " + punti
	let sottotitolo = document.createElement("h2")
	sottotitolo.innerHTML = "Vuoi rigiocare?"
	let bottoneIniziaGioco = document.createElement("button")
	bottoneIniziaGioco.innerHTML = "Inizia il gioco"
	bottoneIniziaGioco.onclick = () => {
		nascondiPopup("schermataVittoria")
		aggiungiEventListenerTastiera()
		iniziaGioco()
	}
	let esci = document.createElement("button")
	esci.innerHTML = "Esci"
	esci.onclick = () => {
		nascondiPopup("schermataVittoria")
		tornaIndex()
	}
	div.appendChild(titolo)
	div.appendChild(sottotioloPunti)
	div.appendChild(sottotitolo)
	div.appendChild(bottoneIniziaGioco)
	div.appendChild(esci)
	let schermataVittoria = creaPopup("schermataVittoria", [div])
	document.body.appendChild(schermataVittoria)
}

function creaSchermataSconfitta() {
	let s = document.querySelector("#schermataSconfitta")
	if (s) {
		s.remove()
	}
	let div = document.createElement("div")
	div.id = "divSchermataSconfitta"
	let titolo = document.createElement("h1")
	titolo.innerHTML = "Hai perso!"
	let sottotitolo = document.createElement("h2")
	sottotitolo.innerHTML = "Vuoi riprovare?"
	let bottoneIniziaGioco = document.createElement("button")
	bottoneIniziaGioco.innerHTML = "Rigioca"
	bottoneIniziaGioco.onclick = () => {
		nascondiPopup("schermataSconfitta")
		aggiungiEventListenerTastiera()
		iniziaGioco()
	}
	let esci = document.createElement("button")
	esci.innerHTML = "Esci"
	esci.onclick = () => {
		nascondiPopup("schermataSconfitta")
		tornaIndex()
	}
	div.appendChild(titolo)
	div.appendChild(sottotitolo)
	div.appendChild(bottoneIniziaGioco)
	div.appendChild(esci)
	let schermataVittoria = creaPopup("schermataSconfitta", [div])
	document.body.appendChild(schermataVittoria)
}
