import React from 'react';
import { Navbar } from '../../navigation/navbar/navbar';
import CartItemsList from '../../entities/cart/cartItemsList';
import Profile from '../../auth/profile';

import LoginButton from '../../auth/login-button';
import LogoutButton from '../../auth/logout-button';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../../contexts/UserContext';
import { useUserCart } from '../../../hooks/dataFetching/useUserCart';

const header = () => {
  const { user } = useUserContext();
  const { isLoading, error } = useAuth0();
  const { data: cartItems } = useUserCart(user?._id);

  return (
    <header>
      <strong className="user-greeting">
        {error && <p>Oops... Authentication error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <Profile />
            <LoginButton />
            <LogoutButton />
          </>
        )}
      </strong>
      <h1>ITEMS APP</h1>
      <CartItemsList cartItems={cartItems} isDropdown={true} />
      <Navbar />
    </header>
  );
};

export default header;
