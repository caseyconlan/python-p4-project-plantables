import React from 'react';
import AloeVera from './images/AloeVera.png';

const plantCatalog = [
    { name: "Aloe Vera", image: AloeVera, water: "Every 3 days", light: "Partial sunlight" },
    { name: "Snake Plant", water: "Every 2 weeks", light: "Partial sunlight" },
    { name: "Monstera", water: "Every week", light: "Bright, indirect light" },
    { name: "Peace Lily", water: "Every 5 days", light: "Low to medium light" },
    { name: "Pothos", water: "Every 7 days", light: "Bright, indirect light" },
    { name: "Spider Plant", water: "Every 1 week", light: "Bright, indirect light" },
    { name: "ZZ Plant", water: "Every 2 weeks", light: "Low to medium light" },
    { name: "Jade Plant", water: "Every 2 weeks", light: "Bright, indirect light" },
    { name: "Rubber Plant", water: "Every 1 week", light: "Medium to bright light" },
    { name: "Fiddle Leaf Fig", water: "Every 10 days", light: "Bright, indirect light" },
    { name: "English Ivy", water: "Every 4 days", light: "Partial shade to full shade" },
    { name: "Bird of Paradise", water: "Every 5 days", light: "Bright, indirect light" },
    { name: "Philodendron", water: "Every 7 days", light: "Bright, indirect light" },
    { name: "Dieffenbachia", water: "Every 1 week", light: "Medium to bright light" },
    { name: "Calathea", water: "Every 4 days", light: "Medium to bright light" },
    { name: "Pilea", water: "Every 1 week", light: "Bright, indirect light" },
    { name: "Moth Orchid", water: "Every 1 week", light: "Bright, indirect light" },
    { name: "Succulent", water: "Every 2 weeks", light: "Bright, direct sunlight" },
    { name: "Cactus", water: "Every 2 weeks", light: "Bright, direct sunlight" },
    { name: "Bamboo Palm", water: "Every 1 week", light: "Bright, indirect light" },
];

function PlantCatalog({ selectPlant }) {
    return (
        <div className="plant-catalog">
            {plantCatalog.map((plant, index) => (
                <div className="plant-item" key={index} onClick={() => selectPlant(plant)}>
                    <img src={plant.image} alt={plant.name} />
                    <h2>{plant.name}</h2>
                    <p>Water: {plant.water}</p>
                    <p>Light: {plant.light}</p>
                </div>
            ))}
        </div>
    );
}

export default PlantCatalog;
