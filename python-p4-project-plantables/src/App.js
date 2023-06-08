import React, { useState, useEffect } from 'react';
import './App.css';
import Pots from './Pots';
import PlantCatalog from './PlantCatalog';
import Login from './Login';
import Garden from './Garden';

function App() {
  const [owners, setOwners] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState(new Array(7).fill(null));

  const selectPlant = (plant) => {
    setSelectedPlants((prev) => {
      const firstEmptySlot = prev.indexOf(null);
      if (firstEmptySlot !== -1) {
        const newPlants = [...prev];
        newPlants[firstEmptySlot] = plant;
        return newPlants;
      }
      return prev;
    });
  };

  useEffect(() => {
    fetch('/owners') // Sends a GET request to '/owners' on the Flask server
      .then((response) => response.json())
      .then((data) => setOwners(data));
  }, []); // Empty dependency array ensures this effect only runs once on component mount

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className="App">
      <h1>Plantables</h1>
      <Garden selectedPlants={selectedPlants} />
      <PlantCatalog selectPlant={selectPlant} />
    </div>
  );
}

export default App;
