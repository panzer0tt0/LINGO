function turno() {
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
                rimuoviEventListenerTastiera() //per evitare di passare al turno successivo schiaggiando enter durante l'alert
                setTimeout(() => {
                    alert("Hai indovinato la parola!")
                    iniziaGioco(numeroLettere)
                })
            }
            if (turnoCorrente >= MAX_TURNI) {
                rimuoviEventListenerTastiera()
                setTimeout(() => {
                    alert("Hai esaurito i turni!")
                    iniziaGioco(numeroLettere)
                })
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
    console.log(ris)

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
