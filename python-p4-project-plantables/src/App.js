// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import PlantCatalog from './PlantCatalog';
import Login from './Login';
import GardenCurationForm from './GardenCurationForm';
import Cart from './Cart';

function App() {
  const [owners, setOwners] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState(new Array(7).fill(null));
  const [showCatalog, setShowCatalog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const selectPlant = (plant) => {
    setSelectedPlants((prev) => {
      const firstEmptySlot = prev.indexOf(null);
      if (firstEmptySlot !== -1) {
        const newPlants = [...prev];
        newPlants[firstEmptySlot] = plant;
        return newPlants;
      }
      return prev;
    });
  };

  const addToCart = (plant) => {
    setSelectedPlants((prev) => {
      const newPlants = [...prev];
      const firstEmptySlot = newPlants.findIndex((p) => p === null);
      if (firstEmptySlot !== -1) {
        newPlants[firstEmptySlot] = plant;
      }
      return newPlants;
    });
  };

  const removeFromCart = (index) => {
    setSelectedPlants((prev) => {
      const newPlants = [...prev];
      newPlants[index] = null;
      return newPlants;
    });
  };

  const placeOrder = () => {
    // Send the selectedPlants array to the server to store in the database
    fetch('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedPlants),
    })
      .then((response) => {
        setSelectedPlants(new Array(7).fill(null));
        console.log('Order placed successfully!');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  useEffect(() => {
    fetch('/owners')
      .then((response) => response.json())
      .then((data) => setOwners(data));
  }, []);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  const handleCatalogClick = () => {
    setShowCatalog(true);
    setShowForm(false);
    setShowCart(false);
  };

  const handleFormClick = () => {
    setShowCatalog(false);
    setShowForm(true);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCatalog(false);
    setShowForm(false);
    setShowCart(true);
  };

  const handleClose = () => {
    setShowCatalog(false);
    setShowForm(false);
    setShowCart(false);
  };

  return (
    <div className="App">
      <h1>Plantables</h1>
      {showCatalog ? (
        <PlantCatalog selectPlant={selectPlant} addToCart={addToCart} onClose={handleClose} />
      ) : showForm ? (
        <GardenCurationForm onClose={handleClose} />
      ) : showCart ? (
        <Cart selectedPlants={selectedPlants} onSubmit={placeOrder} onRemove={removeFromCart} onClose={handleClose} />
      ) : (
        <>
          <button class="button-1" role="button" onClick={handleCatalogClick}>Catalog</button>
          <button class="button-1" role="button" onClick={handleFormClick}>Garden Curation Form</button>
          <button class="button-1" role="button" onClick={handleCartClick}>Cart</button>
        </>
      )}
    </div>
  );
}

export default App;
