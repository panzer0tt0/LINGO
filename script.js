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

const CARATTERI_SPECIALI = "!@#$%^&*()_+[]{}|;':\",.<>?/\\~`"
const CARATTERI = "abcdefghijklmnopqrstuvwxyzàèéìòù"

const MAX_TURNI = 5
var numeroLettere = 5
var turnoCorrente = 0

function iniziaGioco(numLettere) {
    let iniziaGioco = confirm("Vuoi iniziare il gioco?")
    if (!iniziaGioco) {
        return
    }
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

    let bottoneProssimoTurno = document.createElement("button")
    bottoneProssimoTurno.type = "button"
    bottoneProssimoTurno.innerHTML = "Prossimo turno"
    bottoneProssimoTurno.onclick = () => {
        let parola = risolviParola()
        if (parola) {
            turnoCorrente++
            turno(parola)
        } else {
            alert("Parola non valida!")
        }
    }
    areaGioco.appendChild(bottoneProssimoTurno)

    turno()
}

function risolviParola() {
    let ris = ""
    for (let i = 0; i < numeroLettere; i++) {
        let cella = document.querySelector("#campo" + turnoCorrente + "-" + i)
        if (
            !cella.value ||
            cella.value == " " ||
            cella.value.length != 1 ||
            CARATTERI_SPECIALI.includes(cella.value)
        ) {
            ris = false
        } else {
            ris += cella.value
        }
    }
    return ris
}

const PAROLA_CORRETTA = "casa" //temporanea
function controllaParola(parola) {
    let turnoPrecedente = turnoCorrente - 1
    let caratteriCorretti = 0
    for (let i = 0; i < parola.length; i++) {
        let carattere = parola[i]
        if (carattere == PAROLA_CORRETTA[i]) {
            caratteriCorretti++
            document.querySelector(
                "#cella" + turnoPrecedente + "-" + i
            ).style.backgroundColor = "green"
        } else if (PAROLA_CORRETTA.includes(carattere)) {
            document.querySelector(
                "#cella" + turnoPrecedente + "-" + i
            ).style.backgroundColor = "yellow"
        }
    }
    return caratteriCorretti == parola.length
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
