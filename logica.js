function turno(parola) {
    aggiornaCaselle()
    if (parola) {
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
