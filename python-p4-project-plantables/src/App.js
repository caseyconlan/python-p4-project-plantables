import React, { useState } from 'react';
import Pots from './Pots.js';
import PlantCatalog from './PlantCatalog.js';
import './App.css';

function App() {
    const [selectedPlants, setSelectedPlants] = useState(Array(7).fill(null));

    const selectPlant = (index, plant) => {
        const newPlants = [...selectedPlants];
        newPlants[index] = plant;
        setSelectedPlants(newPlants);
    };

    return (
        <div className="App">
            <PlantCatalog selectPlant={selectPlant} />
            <Pots selectedPlants={selectedPlants} />
        </div>
    );
}

export default App;
