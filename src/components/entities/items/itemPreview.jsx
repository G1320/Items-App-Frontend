import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../common/buttons/genericButton';

import {
  useAddItemToCollectionMutation,
  useAddItemToWishlistMutation,
  useRemoveItemFromCollectionMutation,
  useRemoveItemFromWishlistMutation,
} from '../../../hooks/mutations/items/itemMutations';
import WishlistPreview from '../wishlists/wishlistPreview';
import GenericMuiDropdown from '../../common/lists/genericMuiDropdown';

const ItemPreview = ({ item, isInCollection, onAddItemToCart, wishlists }) => {
  const navigate = useNavigate();
  const { collectionId, wishlistId } = useParams();

  const addItemToCollectionMutation = useAddItemToCollectionMutation(collectionId);
  const AddItemToWishlistMutation = useAddItemToWishlistMutation(item._id);
  const removeItemMutation = useRemoveItemFromCollectionMutation(collectionId);
  const removeItemFromWishlistMutation = useRemoveItemFromWishlistMutation(wishlistId);

  const handleAddItemToCollection = async () => addItemToCollectionMutation.mutate(item._id);
  const handleRemoveItemFromCollection = async () => removeItemMutation.mutate(item._id);

  const handleAddItemToWishlist = async (wishlistId) => AddItemToWishlistMutation.mutate(wishlistId);
  const handleRemoveItemFromWishlist = async (itemId) => {
    removeItemFromWishlistMutation.mutate(itemId);
    navigate(`/wishlists/${wishlistId}`);
  };

  const handleClick = (e) => {
    const target = e.target;
    if (target.nodeName !== 'BUTTON') {
      navigate(`/item/${item._id}`);
    }
  };

  const renderItem = (wishlist) => (
    <WishlistPreview
      wishlist={wishlist}
      key={wishlist._id}
      onAddItemToWishList={() => handleAddItemToWishlist(wishlist._id)}
    />
  );

  return (
    <article onClick={handleClick} key={item._id} className="preview item-preview">
      <h2>{item.name}</h2>
      <h3>${item.price}</h3>
      <img src={item.imgUrl} alt={item.name} />
      <GenericMuiDropdown
        data={wishlists}
        renderItem={renderItem}
        className="item-details-wishlists-dropdown"
        title="Add to Wishlist"
      />

      {wishlistId && (
        <Button onClick={() => handleRemoveItemFromWishlist(item._id)}>Remove from Wishlist</Button>
      )}

      {isInCollection
        ? collectionId && (
            <Button
              onClick={() => handleRemoveItemFromCollection(item._id)}
              className="remove-from-collection"
            >
              Remove from Collection
            </Button>
          )
        : collectionId && (
            <Button onClick={() => handleAddItemToCollection(item)} className="add-to-collection">
              Add to Collection
            </Button>
          )}

      {onAddItemToCart && <Button onClick={() => onAddItemToCart(item._id)}>Add to Cart </Button>}
    </article>
  );
};

export default ItemPreview;
