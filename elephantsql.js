const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Verbindung zur PostgreSQL-Datenbank
const connectionString = "ostgres://zfcytmqh:SxlzVJ4RWrYKVjN-xsNkLwW7nbus9fhX@tyke.db.elephantsql.com/zfcytmqh";
const client = new Client({ connectionString });
client.connect();

// Route für das Inkrementieren des Zählers
app.post('/increment', (req, res) => {
    const { person } = req.body;

    // Füge den Code hier ein, um die Daten in die Datenbank einzufügen
    const query = `INSERT INTO deineTabelle (person) VALUES ('${person}')`;

    client.query(query, (err, result) => {
        if (err) {
            console.error('Fehler beim Einfügen in die Datenbank', err);
            res.status(500).send('Fehler beim Einfügen in die Datenbank');
        } else {
            res.status(200).json({ message: 'Erfolgreich eingefügt' });
        }
    });
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
