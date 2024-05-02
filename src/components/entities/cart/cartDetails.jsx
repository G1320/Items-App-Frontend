import React from 'react';
import CartItemsList from './cartItemsList';

const CartDetails = () => {
  return (
    <section className="cart-details">
      <h2>Cart items list</h2>
      <CartItemsList />
    </section>
  );
};

export default CartDetails;
