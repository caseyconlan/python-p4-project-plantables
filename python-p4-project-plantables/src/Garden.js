// Garden.js

import React from 'react';
import Pots from './Pots';
import PlantCatalog from './PlantCatalog';

const Garden = ({ selectedPlants, selectPlant, setLoggedIn }) => {
  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <h1>Plantables</h1>
      <button onClick={handleLogout}>Logout</button>
      <Pots selectedPlants={selectedPlants} />
      <PlantCatalog selectPlant={selectPlant} />
    </div>
  );
}

export default Garden;
