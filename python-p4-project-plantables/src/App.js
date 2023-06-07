// App.js
import React, { useState } from 'react';
import './App.css';
import Pots from './Pots';
import PlantCatalog from './PlantCatalog';
import Login from './Login';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedPlants, setSelectedPlants] = useState(new Array(7).fill(null));

    const selectPlant = (plant) => {
        setSelectedPlants(prev => {
            const firstEmptySlot = prev.indexOf(null);
            if (firstEmptySlot !== -1) {
                const newPlants = [...prev];
                newPlants[firstEmptySlot] = plant;
                return newPlants;
            }
            return prev; 
        });
    };

    if (!loggedIn) {
        return <Login setLoggedIn={setLoggedIn} />
    }

    return (
        <div className="App">
            <h1>Plantables</h1>
            <Pots selectedPlants={selectedPlants} />
            <PlantCatalog selectPlant={selectPlant} />
        </div>
    );
}

export default App;
