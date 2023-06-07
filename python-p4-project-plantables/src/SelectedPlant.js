// src/components/SelectedPlant.js

import React from "react";

const SelectedPlant = ({ selectedPlant }) => {
  return (
    <div>
      <h2>Selected Plant</h2>
      {selectedPlant ? (
        <div>
          <h3>{selectedPlant.name}</h3>
          <img src={selectedPlant.image} alt={selectedPlant.name} />
        </div>
      ) : (
        <p>No plant selected</p>
      )}
    </div>
  );
};

export default SelectedPlant;
