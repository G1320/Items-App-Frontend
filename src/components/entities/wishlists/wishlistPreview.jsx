import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/buttons/genericButton';

const WishlistPreview = ({ wishlist, onAddItemToWishList = null }) => {
  const navigate = useNavigate();

  return (
    <article key={wishlist._id} className="preview wishlist-preview">
      <Button onClick={() => navigate(`/wishlists/${wishlist._id}`)}>Go to {wishlist.name}</Button>
      {onAddItemToWishList && <Button onClick={() => onAddItemToWishList(wishlist._id)}>+</Button>}
    </article>
  );
};

export default WishlistPreview;
