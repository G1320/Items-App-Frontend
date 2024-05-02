import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../common/buttons/genericButton';
import ItemPreview from '../items/itemPreview';
import { getLocalUser } from '../../../services/user-service';
import { useWishlistItems } from '../../../hooks//dataFetching/useWishlistItems';
import { useCollections } from '../../../hooks/dataFetching/useCollections';
import ItemsList from '../items/itemsList';
import {
  useAddItemToCartMutation,
  useAddItemsToCartMutation,
} from '../../../hooks/mutations/cart/cartMutations';
import { calculateTotalPrice, getItemQuantityMap } from '../../../utils/cartUtils';
import { toast } from 'sonner';
import { useDeleteWishlistMutation } from '../../../hooks/mutations/wishlists/wishlistMutations';

const WishlistDetails = ({ items = null }) => {
  const { wishlistId } = useParams();
  const navigate = useNavigate();
  const user = getLocalUser();

  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const { data: allCollections } = useCollections();
  const { data: wishlistObj } = useWishlistItems(user?._id, wishlistId);
  const addItemsToCartMutation = useAddItemsToCartMutation(user?._id);
  const deleteUserWishlistMutation = useDeleteWishlistMutation(user?._id);

  const handlePagination = (nextId) => (nextId ? navigate(`/wishlists/${nextId}`) : null);
  const handleGoToEdit = (wishlistId) => (wishlistId ? navigate(`/edit-wishlist/${wishlistId}`) : null);

  const handleAddWishlistItemsToCart = (wishlistItems) => {
    if (wishlistItems.length === 0) return toast.error('No items to add to cart');

    const wishlistItemsIds = wishlistItems.map((wishlistItem) => wishlistItem.itemId);
    addItemsToCartMutation.mutate(wishlistItemsIds);
    // deleteUserWishlistMutation.mutate(wishlistId);
    // navigate('/cart');
  };

  useEffect(() => {
    if (wishlistObj && wishlistObj?.currWishlist && items && allCollections) {
      // Filter items based on itemIds which are also present in the current wishlist
      const filteredItems = items?.filter((item) =>
        wishlistObj.currWishlist.items.some((wishlistItem) => wishlistItem.itemId === item._id)
      );

      // Filter collections based on collectionIds which are also present in the current wishlist
      const filteredCollections = allCollections.filter((collection) =>
        wishlistObj.currWishlist.collections.some(
          (wishlistCollection) => wishlistCollection.itemId === collection._id
        )
      );

      setFilteredItems(filteredItems);
      setFilteredCollections(filteredCollections);
    }
  }, [wishlistObj, items, allCollections]);

  const totalPrice = calculateTotalPrice(filteredItems);

  return (
    <section className="details wishlist-details">
      <h2>Name: {wishlistObj?.currWishlist.name}</h2>
      <h3>Total Price: ${totalPrice}</h3>
      <section className="details-buttons wishlist-details-buttons">
        <Button onClick={() => handleGoToEdit(wishlistObj?.currWishlist?._id)}>Edit</Button>
        <Button onClick={() => handlePagination(wishlistObj?.prevWishlist?._id)}>Prev</Button>
        <Button onClick={() => handlePagination(wishlistObj?.nextWishlist?._id)}>Next</Button>
        <Button onClick={() => handleAddWishlistItemsToCart(wishlistObj?.currWishlist?.items)}>
          Add to Cart
        </Button>
      </section>

      {filteredItems ? (
        <ul className="wishlist-details wishlist-items-list">
          {/* <h2>Wishlist items:</h2> */}
          <div className="wishlist-details-items-list">
            <ItemsList items={filteredItems} />
          </div>
        </ul>
      ) : null}

      {filteredCollections && filteredCollections.length > 0 ? (
        <ul className="wishlist-details wishlist-collections-list">
          <h2>Wishlist collections:</h2>
          {filteredCollections.map((collection) => (
            <section key={collection._id} className="wishlist-collections">
              <ItemPreview item={collection} />
              <div>Hey there, {collection.name}</div>
            </section>
          ))}
        </ul>
      ) : null}
      <h2>All Items:</h2>
      <ItemsList items={items} />
    </section>
  );
};

export default WishlistDetails;
