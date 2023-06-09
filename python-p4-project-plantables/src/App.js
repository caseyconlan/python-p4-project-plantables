import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import PlantCatalog from './PlantCatalog';
import Login from './Login';
import GardenCurationForm from './GardenCurationForm';
import Cart from './Cart';

function App() {
  const [owners, setOwners] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState(new Array(7).fill(null));

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

  return (
    <Router>
      <div className="App">
        <h1>Plantables</h1>
        <nav>
          <Link className="button-1" to="/catalog">
            Catalog
          </Link>
          <Link className="button-1" to="/form">
            Garden Curation Form
          </Link>
          <Link className="button-1" to="/cart">
            Cart
          </Link>
        </nav>

        <Switch>
        <Route path="/catalog">
          <PlantCatalog selectPlant={selectPlant} addToCart={addToCart} />
          </Route>
          <Route path="/form">
            <GardenCurationForm />
          </Route>
          <Route path="/cart">
            <Cart
              selectedPlants={selectedPlants}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
