import React from 'react';
import { useHistory } from 'react-router-dom';

function Cart({ selectedPlants, placeOrder, removeFromCart }) {
  const history = useHistory();

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handlePlaceOrder = () => {
    placeOrder();
    history.push('/');
  };

  const handleClose = () => {
    history.push('/');
  };

  return (
    <div className="My-Cart">
      <h2>My Cart</h2>
      <div className="cart">
        {selectedPlants.map((item, index) => (
          item && item.plant && (
            <div key={index} className="plant-details">
              {item.plant.image && (
                <img className="cart-img" src={process.env.PUBLIC_URL + item.plant.image} alt={item.plant.name} />
              )}
              <span>{item.plant.name}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Cost: ${item.plant.price * item.quantity}</span>
              <button className="button-1" role="button" onClick={() => handleRemove(index)}>Remove</button>
            </div>
          )
        ))}
        <div className="cart-buttons">
          <button className="button-1" role="button" onClick={handlePlaceOrder}>Place Order</button>
          <button className="button-1" role="button" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
