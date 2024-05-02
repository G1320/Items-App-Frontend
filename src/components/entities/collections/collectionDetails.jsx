import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCollection } from '../../../hooks/dataFetching/useCollection';
import ItemPreview from '../items/itemPreview';
import ItemsList from '../items/itemsList';
import Button from '../../common/buttons/genericButton';
import GenericList from '../../common/lists/genericList';
import {
  useAddItemToCartMutation,
  useAddItemsToCartMutation,
} from '../../../hooks/mutations/cart/cartMutations';
import { getLocalUser } from '../../../services/user-service';
import { toast } from 'sonner';
import { useAddCollectionToWishlistMutation } from '../../../hooks/mutations/wishlists/wishlistMutations';
import GenericMuiDropdown from '../../common/lists/genericMuiDropdown';
import { useWishlists } from '../../../hooks/dataFetching/useWishlists';
import WishlistPreview from '../wishlists/wishlistPreview';

const CollectionDetails = ({ items = null }) => {
  const navigate = useNavigate();
  const user = getLocalUser();
  const { collectionId } = useParams();

  const [filteredItems, setFilteredItems] = useState([]);
  const { data: collectionObj } = useCollection(collectionId);
  const { data: wishlists } = useWishlists(user?._id);

  const addItemToCartMutation = useAddItemToCartMutation(user?._id);
  const addItemsToCartMutation = useAddItemsToCartMutation(user?._id);
  const addItemToWishlistMutation = useAddCollectionToWishlistMutation(collectionId);

  useEffect(() => {
    if (collectionObj && collectionObj.currCollection && items) {
      const filtered = items.filter((item) =>
        collectionObj.currCollection.items.some((collectionItem) => collectionItem.itemId === item._id)
      );
      setFilteredItems(filtered);
    }
  }, [collectionObj, items]);

  const handleAddItemToCart = (item) => addItemToCartMutation.mutate(item);

  const handleAddCollectionItemsToCart = (currCollectionItems) => {
    if (currCollectionItems.length === 0) return toast.error('No items to add to cart');
    const collectionItemsIds = currCollectionItems.map((collectionItem) => collectionItem.itemId);
    addItemsToCartMutation.mutate(collectionItemsIds);
  };

  const handleAddItemToWishlist = async (wishlistId) => addItemToWishlistMutation.mutate(wishlistId);

  const handlePagination = (nextId) => (nextId ? navigate(`/collections/${nextId}`) : null);
  const handleGoToEdit = (collectionId) =>
    collectionId ? navigate(`/edit-collection/${collectionId}`) : null;

  const renderItem = (item) => (
    <ItemPreview
      item={item}
      key={item._id}
      isInCollection={true}
      onAddItemToCart={handleAddItemToCart}
    />
  );

  const dropdownRenderItem = (wishlist) => (
    <WishlistPreview
      wishlist={wishlist}
      key={wishlist._id}
      onAddItemToWishList={() => handleAddItemToWishlist(wishlist._id)}
    />
  );

  return (
    <section className="details collection-details">
      <h1 className="collection-details-title">The {collectionObj?.currCollection?.name} Collection</h1>
      <section className="details-buttons item-details-buttons">
        <GenericMuiDropdown
          data={wishlists}
          renderItem={dropdownRenderItem}
          className="item-details-wishlists-dropdown"
          title="Add to Wishlist"
        />
        <Button onClick={() => handleGoToEdit(collectionObj?.currCollection?._id)}>Edit</Button>
        <Button onClick={() => handlePagination(collectionObj?.nextCollection?._id)}>Next</Button>
        <Button onClick={() => handlePagination(collectionObj?.prevCollection?._id)}>Prev</Button>
        <Button onClick={() => handleAddCollectionItemsToCart(collectionObj?.currCollection?.items)}>
          Add to Cart
        </Button>
      </section>
      <GenericList data={filteredItems} renderItem={renderItem} className="collection-items-list" />
      <div className="collection-details-items-list">
        <ItemsList items={items} />
      </div>
    </section>
  );
};

export default CollectionDetails;
