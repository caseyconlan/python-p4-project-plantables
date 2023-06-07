import React from 'react';
import './App.css';

function Pots({ selectedPlants }) {
    return (
        <div className="pots">
            {selectedPlants.map((plant, index) => (
                <div className="pot" key={index}>
                    {plant ? (
                        <>
                            <img src={plant.image} alt={plant.name} />
                            <h2>{plant.name}</h2>
                            <p>Water: {plant.water}</p>
                            <p>Light: {plant.light}</p>
                        </>
                    ) : (
                        <p>No plant selected</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Pots;
