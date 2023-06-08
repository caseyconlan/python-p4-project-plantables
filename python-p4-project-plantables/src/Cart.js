// Cart.js

import React from 'react';

function Cart({ selectedPlants, onSubmit, onClose }) {
  return (
    <div className="cart">
      <h2>Cart</h2>
      {selectedPlants.map((plant, index) => (
        <div key={index}>
          {plant && (
            <div>
              <span>{plant.name}</span>
              <button class="button-1" role="button" onClick={() => onSubmit(index)}>Remove</button>
            </div>
          )}
        </div>
      ))}
      <button class="button-1" role="button" onClick={onSubmit}>Place Order</button>
      <button class="button-1" role="button" onClick={onClose}>Close</button>
    </div>
  );
}

export default Cart;
