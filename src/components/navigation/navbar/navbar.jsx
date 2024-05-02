import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Collections</Link>
      <Link to="/store">Store</Link>
      <Link to="/wishlists">Wishlists</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
}
