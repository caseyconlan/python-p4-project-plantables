// PlantCatalog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function PlantCatalog({ selectPlant, addToCart, onClose }) {
  const [plantCatalog, setPlantCatalog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [plantsPerPage] = useState(15);

  useEffect(() => {
    axios
      .get('/plants')
      .then((response) => {
        setPlantCatalog(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching plant catalog:', error);
      });
  }, []);

  const handleAddToCart = (plant, quantity) => {
    addToCart({ ...plant, quantity });
  };

  // Get current plants
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plantCatalog.slice(indexOfFirstPlant, indexOfLastPlant);

  // Pagination
  const totalPages = Math.ceil(plantCatalog.length / plantsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="plant-catalog">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <div className="grid-container">
        {currentPlants.map((plant, index) => (
          <div className="plant-item" key={index}>
            <img src={process.env.PUBLIC_URL + plant.image} alt={plant.name} />
            <h2>{plant.name}</h2>
            <p>Price: {plant.price}</p>
            <p>Light: {plant.light_req}</p>
            <input
              type="number"
              min="1"
              defaultValue="1"
              onChange={(e) => {
                const quantity = parseInt(e.target.value);
                if (!isNaN(quantity)) {
                  plant.quantity = quantity;
                }
              }}
            />
            <button onClick={() => handleAddToCart(plant, plant.quantity || 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PlantCatalog;
