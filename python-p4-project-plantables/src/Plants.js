import React from 'react';

function Plants({ plant }) {
    return (
        <div className="plant">
            {plant ? (
                <div>
                    <img src={plant.image} alt={plant.name} />
                    <h2>{plant.name}</h2>
                </div>
            ) : (
                <h2>No plant selected</h2>
            )}
        </div>
    );
}

export default Plants;
