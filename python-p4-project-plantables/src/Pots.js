import React from 'react';
import Plants from './Plants.js';

function Pots({ selectedPlants }) {
    return (
        <div className="pots">
            {selectedPlants.map((plant, index) => (
                <Plants key={index} plant={plant} />
            ))}
        </div>
    );
}

export default Pots;
