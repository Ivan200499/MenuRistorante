const express = require('express');
const cors = require('cors');
const fs = require('fs');
const QRCode = require('qrcode');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let ordini = [];

// Endpoint per ricevere ordini
app.post('/ordine', (req, res) => {
  const ordine = req.body;
  ordini.push(ordine);
  console.log('Nuovo ordine ricevuto:', ordine);
  res.status(200).send('Ordine ricevuto');
});

// Endpoint per visualizzare gli ordini
app.get('/ordini', (req, res) => {
  res.status(200).json(ordini);
});

// Generazione di QR code per ogni tavolo
const generaQRCode = async (tavolo) => {
  const url = `http://localhost:3000/menu?tavolo=${tavolo}`;
  try {
    await QRCode.toFile(`./qrcodes/tavolo_${tavolo}.png`, url);
    console.log(`QR Code generato per il Tavolo ${tavolo}`);
  } catch (err) {
    console.error(err);
  }
};

// Creazione della cartella per i QR code
if (!fs.existsSync('./qrcodes')){
  fs.mkdirSync('./qrcodes');
}

// Genera QR code per 40 tavoli
for (let i = 1; i <= 40; i++) {
  generaQRCode(i);
}

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
