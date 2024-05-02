import React from 'react';
import CartItemsList from './cartItemsList';
import { useUserCart } from '../../../hooks/dataFetching/useUserCart';
import { useUserContext } from '../../../contexts/UserContext';

const CartDetails = () => {
  const { user } = useUserContext();
  const { data: cartItems } = useUserCart(user?._id);

  return (
    <section className="cart-details">
      <h2>Cart items list</h2>
      <CartItemsList cartItems={cartItems} />
    </section>
  );
};

export default CartDetails;
