"use strict"; // Usiamo use strict poichè lavoriamo con file commonJS, quindi non impostato come valore di default.
console.clear(); // Effettuiamo un clear della console da eventuali errori e righe di codice iniziali

// Step 1 ----Creiamo-progetto-Node----:
// - Inizializziamo un progetto node con il comando npm init -y ( shortcut per evitare la prassi di configurazione del progetto ):
// - Utilizziamo un alias script nel file package.json e applichiamo il controllo --watch per il live refresh della console.
// - Installiamo il modulo express tramite la console con il comando npm install express.
// - Creo un file .gitignore per omettere l'esportazione del contenuto dei moduli express.

// Step 2 ----Creazione-del-server-con-express----:

// - Creiamo una costante e importiamo il modulo express.
const express = require("express");
// - Creiamo una costante app e assegniamo il valore dell'applicazione server.
const app = express();
// - Creiamo una costante e la inizializziamo al valore della porta:
const PORT = 3000;
// - Esportiamo dal file db.js l'array di oggetti:
const posts = require("./db.js");
const { log } = require("console");



// - Effettuiamo una richiesta get per ottenere dati dal server: Accetta due parametri app.get(path, callback).
app.get("/", (req, res) => {
    res.send("Server del mio blog"); // Sulla risposta usiamo il metodo send per inviare del puro testo sulla pagina web ( Oppure anche del contenuto HTML ).
});

// Esempio con post...
app.post("/", (req, res) => {
    res.send("post")
});

// - Creiamo una rotta /bacheca che restituisca un oggetto json e il suo conteggio. Accetta una sola risposta.
app.get("/bacheca", (req, res) => {

    // Risposta base
    const risposta = {
        conteggio: posts.length,
        posts: posts,
    }
    //res.json(risposta)

    // Con query string
    const { tags } = req.query; // Catturiamo il valore di tag con la destrutturazione dell'oggetto.
    let arrayFiltred = posts;

    if (tags) {
        arrayFiltred = arrayFiltred.filter((element) => element.tags.includes(tags));
    }

    res.json(arrayFiltred)

});

// STEP 3  ---Asset-Statici---
// - Configuriamo gli asset statici sull’applicazione.
app.use(express.static('public'));



// - Mettiamo in ascolto il server sulla porta specificata: Va messo alla fine del codice.
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta: http://localhost:${PORT}`);
});







