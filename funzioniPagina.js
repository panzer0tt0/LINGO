function aggiungiEventListenerTastiera() {
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Backspace" &&
            event.target.tagName === "INPUT" &&
            event.target.value === ""
        ) {
            let currentId = event.target.id
            let [prefix, rowCol] = currentId.split("campo")
            let [row, col] = rowCol.split("-")
            let prevCol = parseInt(col) - 1
            let prevInput = document.querySelector(`#campo${row}-${prevCol}`)
            if (prevInput) {
                prevInput.focus()
            }
        } else if (
            CARATTERI.includes(event.key) &&
            event.target.tagName === "INPUT" &&
            event.target.value !== ""
        ) {
            let currentId = event.target.id
            let [prefix, rowCol] = currentId.split("campo")
            let [row, col] = rowCol.split("-")
            let nextCol = parseInt(col) + 1
            let nextInput = document.querySelector(`#campo${row}-${nextCol}`)
            if (nextInput) {
                nextInput.value = event.key
                nextInput.focus()
            }
        } else if (event.key === "Enter") {
            prossimoTurno()
        }
    })
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
        prossimoTurno()
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