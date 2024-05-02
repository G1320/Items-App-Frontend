import React from 'react';
import { Link } from 'react-router-dom';

import ItemPreview from './itemPreview';
import GenericList from '../../common/lists/genericList';
import { useAddItemToCartMutation } from '../../../hooks/mutations/cart/cartMutations';
import { getLocalUser } from '../../../services/user-service';
import { useWishlists } from '../../../hooks/dataFetching/useWishlists';

const ItemsList = ({ items = null }) => {
  const user = getLocalUser();
  const { data: allWishlists } = useWishlists(user?._id);

  const addItemToCartMutation = useAddItemToCartMutation(user?._id);
  const handleAddItemToCart = (item) => addItemToCartMutation.mutate(item);

  const renderItem = (item) => (
    <ItemPreview
      item={item}
      key={item.name}
      onAddItemToCart={handleAddItemToCart}
      wishlists={allWishlists}
    />
  );

  return (
    <section className="items">
      <h2>Items list</h2>
      {user && <Link to="/create-item">Create item</Link>}
      <GenericList data={items} renderItem={renderItem} className="items-list" />{' '}
    </section>
  );
};
export default ItemsList;
