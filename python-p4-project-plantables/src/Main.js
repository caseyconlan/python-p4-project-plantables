import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import PlantCatalog from './PlantCatalog';
import Login from './Login';
import GardenCurationForm from './GardenCurationForm';
import Cart from './Cart';

function Main() {
    const [owners, setOwners] = useState([]);
    const [loggedIn, setLoggedIn] = useState(() => {
      return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [selectedPlants, setSelectedPlants] = useState(new Array(7).fill(null));
    const history = useHistory();

    useEffect(() => {
        // Fetch the list of owners from the backend
        axios
          .get('/owners')
          .then((response) => {
            setOwners(response.data);
          })
          .catch((error) => {
            console.error('Error fetching owners:', error);
          });
    
        localStorage.setItem('isLoggedIn', loggedIn ? 'true' : 'false');
        if (!loggedIn) {
          history.push('/login');
        }
      }, [loggedIn, history]);

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

  const handleLogin = () => {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;
  
    axios
      .post('/login', {
        username: enteredUsername,
        password: enteredPassword,
      })
      .then((response) => {
        console.log('Login successful');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('ownerId', response.data.owner_id); // Set ownerId in localStorage
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };
  
  const handleLogout = () => {
  setLoggedIn(false);
  localStorage.setItem('isLoggedIn', 'false');
  history.push('/login'); // Redirect to the login page
};

  

  const handleDeleteAccount = () => {
    const ownerId = localStorage.getItem('ownerId');
  
    axios
      .delete(`/owners/${ownerId}`)
      .then(() => {
        console.log('Account deleted');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('ownerId');
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });
  };
  

  return (
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
        <button className="button-1" onClick={() => handleLogout()}>
          Logout
        </button>
        <button className="button-1" onClick={handleDeleteAccount}>
          Delete Account
        </button>
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
);
  };

export default Main;