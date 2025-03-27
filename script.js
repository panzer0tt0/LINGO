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
        event.key !== "Backspace" &&
        event.target.tagName === "INPUT" &&
        event.target.value !== ""
    ) {
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

var grigliaHTML

function caricaGriglia(larghezza, altezza) {
    if (larghezza < 1 || altezza < 1) {
        alert("Larghezza e altezza devono essere maggiori di 0")
        return
    }
    grigliaHTML = document.querySelector("#griglia")
    for (let i = 0; i < altezza; i++) {
        let riga = document.createElement("tr")
        for (let j = 0; j < larghezza; j++) {
            let cella = creaCella(i + "-" + j)
            riga.appendChild(cella)
        }
        grigliaHTML.appendChild(riga)
    }
}

function creaCella(id) {
    let cella = document.createElement("td")
    cella.id = "cella" + id
    let campo = document.createElement("input")
    campo.type = "text"
    campo.id = "campo" + id
    campo.maxLength = 1
    campo.placeholder = campo.id
    cella.appendChild(campo)
    return cella
}

// function debugGriglia(id) {
//     for (let i = 0; i < grigliaHTML.rows.length; i++) {
//         for (let j = 0; j < grigliaHTML.rows[i].cells.length; j++) {
//             console.log(document.querySelector("#" + id + i + "-" + j))
//         }
//     }
// }
