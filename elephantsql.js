const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Verbindung zur PostgreSQL-Datenbank
const connectionString = "postgres://zfcytmqh:SxlzVJ4RWrYKVjN-xsNkLwW7nbus9fhX@tyke.db.elephantsql.com/zfcytmqh";
const client = new Client({ connectionString });
client.connect();

// Erstelle die Tabelle, falls sie noch nicht existiert
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS counters (
        person VARCHAR(255) PRIMARY KEY,
        counter INT DEFAULT 0
    );
`;

client.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Fehler beim Erstellen der Tabelle', err);
    } else {
        console.log('Tabelle erfolgreich erstellt');
    }
});

// Route für das Inkrementieren des Zählers
app.post('/increment', (req, res) => {
    const { person } = req.body;

    // Füge den Code hier ein, um die Daten in die Datenbank einzufügen
    const query = `UPDATE counters SET counter = counter + 1 WHERE person = $1`;
    const values = [person];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Fehler beim Aktualisieren der Datenbank', err);
            res.status(500).send('Fehler beim Aktualisieren der Datenbank');
        } else {
            res.status(200).json({ message: 'Erfolgreich aktualisiert' });
        }
    });
});

// Route zum Abrufen der Zählerdaten
app.get('/counters', (req, res) => {
    const query = 'SELECT * FROM counters';

    client.query(query, (err, result) => {
        if (err) {
            console.error('Fehler beim Abrufen der Zählerdaten', err);
            res.status(500).send('Fehler beim Abrufen der Zählerdaten');
        } else {
            const counters = {};
            result.rows.forEach(row => {
                counters[row.person] = row.counter;
            });
            res.status(200).json(counters);
        }
    });
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
