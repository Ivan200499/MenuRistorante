import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ordine, setOrdine] = useState([]);
  const [tavolo, setTavolo] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tavolo = queryParams.get('tavolo');
    setTavolo(tavolo);
  }, []);

  const menu = {
    Antipasti: [
      { id: 1, nome: 'Fresella con pomodorino', prezzo: 3.5 },
      { id: 2, nome: 'Tagliata frutta', prezzo: 5 }
    ],
    Bevande: [
      { id: 3, nome: 'Acqua bottiglia', prezzo: 1.5 },
      { id: 4, nome: 'Bottiglia grande', prezzo: 2.5 },
      { id: 5, nome: 'Coca cola / Pepsi', prezzo: 2.5 },
      { id: 6, nome: 'Birra spina', prezzo: 3.5 },
      { id: 7, nome: 'Fanta', prezzo: 2.5 },
      { id: 8, nome: 'Estate pesca limone', prezzo: 2.5 },
      { id: 9, nome: 'Becks / Heineken / Nastro', prezzo: 3 },
      { id: 10, nome: 'Corona', prezzo: 3.5 },
      { id: 11, nome: 'Tennets', prezzo: 3.5 }
    ],
    Primi: [
      { id: 12, nome: 'Pasta fredda', prezzo: 6 },
      { id: 13, nome: 'Pasta pomodorino fresco', prezzo: 6 },
      { id: 14, nome: 'Calamarata frutti mare', prezzo: 13 }
    ],
    Secondi: [
      { id: 15, nome: 'Frittura calamari e gamberi', prezzo: 15 },
      { id: 16, nome: 'Tagliata black angus', prezzo: '8€/etto' }
    ],
    Vini: [
      { id: 17, nome: 'Falanghina frizzante', prezzo: 13 },
      { id: 18, nome: 'Falanghina Beneventana', prezzo: 13 },
      { id: 19, nome: 'Moet', prezzo: 80 },
      { id: 20, nome: 'Cliquot vocque', prezzo: 60 }
    ],
    Cocktails: [
      { id: 21, nome: 'Cocktail', prezzo: 5 },
      { id: 22, nome: 'Gin tonic special', prezzo: 10 },
      { id: 23, nome: 'Spritz', prezzo: 5 }
    ],
    Dolce: [
      { id: 24, nome: 'Granita', prezzo: 3 },
      { id: 25, nome: 'Caffè', prezzo: 1 }
    ]
  };

  const aggiungiAlOrdine = (item) => {
    setOrdine([...ordine, item]);
  };

  const inviaOrdine = () => {
    fetch('http://localhost:5000/ordine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tavolo, items: ordine }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        setOrdine([]);
      });
  };

  return (
    <div className="App">
      <h1>Menu Online - Tavolo {tavolo}</h1>
      {Object.keys(menu).map(category => (
        <div key={category} className="menu-category">
          <h2>{category}</h2>
          <ul>
            {menu[category].map(item => (
              <li key={item.id}>
                {item.nome} - €{item.prezzo}
                <button onClick={() => aggiungiAlOrdine(item)}>Aggiungi</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={inviaOrdine}>Invia Ordine</button>
    </div>
  );
}

export default App;
