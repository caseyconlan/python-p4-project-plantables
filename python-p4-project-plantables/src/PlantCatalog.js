import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlantCatalog({ selectPlant }) {
    const [plantCatalog, setPlantCatalog] = useState([]);

    useEffect(() => {
        axios.get('/plants')
            .then(response => {
                setPlantCatalog(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching plant catalog:', error);
            });
    }, []);

    return (
        <div className="plant-catalog">
            {plantCatalog.map((plant, index) => (
                <div className="plant-item" key={index} onClick={() => selectPlant(plant)}>
                    <img src={process.env.PUBLIC_URL + plant.image} alt={plant.name} />
                    <h2>{plant.name}</h2>
                    <p>Water: {plant.water_req}</p>
                    <p>Light: {plant.light_req}</p>
                </div>
            ))}
        </div>
    );
}

export default PlantCatalog;