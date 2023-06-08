import React, { useState, useEffect } from 'react';
import './App.css';
import Pots from './Pots';
import PlantCatalog from './PlantCatalog';
<<<<<<< HEAD
import Login from './Login';
import Garden from './Garden';
=======
// import Login from './Login';
>>>>>>> 1c929d87c6546aa8a9fbeb12f50ab270e3f64431

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

<<<<<<< HEAD
  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }
  
  return (
    <Garden selectedPlants={selectedPlants} selectPlant={selectPlant} setLoggedIn={setLoggedIn} />
  );
=======
  // if (!loggedIn) {
  //   return <Login setLoggedIn={setLoggedIn} />;
  // }
>>>>>>> 1c929d87c6546aa8a9fbeb12f50ab270e3f64431

  return (
    <div className="App">
      <h1>Plantables</h1>
      <Garden selectedPlants={selectedPlants} />
      <PlantCatalog selectPlant={selectPlant} />
    </div>
  );
}

export default App;
