import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ordini, setOrdini] = useState([]);

  useEffect(() => {
    const fetchOrdini = () => {
      fetch('http://localhost:5000/ordini')
        .then(response => response.json())
        .then(data => setOrdini(data));
    };

    fetchOrdini();
    const interval = setInterval(fetchOrdini, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Dashboard Ordini</h1>
      <ul>
        {ordini.map((ordine, index) => (
          <li key={index}>
            Tavolo {ordine.tavolo}: {ordine.items.map(item => item.nome).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
