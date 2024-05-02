import React from 'react';
import GenericList from '../../common/lists/genericList';
import GenericMuiDropdown from '../../common/lists/genericMuiDropdown';
import GenericMultiDropdownEntryPreview from '../../common/lists/genericMultiDropdownEntryPreview';
import CartItemPreview from './cartItemPreview';
import {
  useDeleteUserCartMutation,
  useRemoveItemFromCartMutation,
} from '../../../hooks/mutations/cart/cartMutations';
import { calculateTotalPrice, getItemQuantityMap, getUniqueItems } from '../../../utils/cartUtils';
import { toast } from 'sonner';

const CartItemsList = ({ cartItems, isDropdown = false, isMultiSelect = false }) => {
  const removeItemFromCartMutation = useRemoveItemFromCartMutation();
  const deleteUserCartMutation = useDeleteUserCartMutation();

  const totalPrice = calculateTotalPrice(cartItems);
  const itemQuantityMap = getItemQuantityMap(cartItems);
  const uniqueCartItems = getUniqueItems(cartItems, itemQuantityMap);

  const handleRemoveFromCart = (item) => {
    removeItemFromCartMutation.mutate(item._id);
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return toast.error('Cart is already empty');
    deleteUserCartMutation.mutate();
  };

  const renderItem = isMultiSelect
    ? (item) => <GenericMultiDropdownEntryPreview entry={item} key={item._id} />
    : (item) => (
        <CartItemPreview
          item={item}
          quantity={itemQuantityMap?.get(item._id)}
          onRemoveFromCart={handleRemoveFromCart}
          key={item._id}
        />
      );

  return (
    <section className="cart">
      <h3>{cartItems?.length || 0} Items </h3>
      <h3>Total: ${totalPrice || '0.00'}</h3>

      {isDropdown ? (
        <>
          <GenericMuiDropdown
            data={uniqueCartItems}
            renderItem={renderItem}
            className="cart-list"
            title="Cart"
          />
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        </>
      ) : (
        <GenericList data={uniqueCartItems} renderItem={renderItem} className="cart-list" />
      )}
    </section>
  );
};

export default CartItemsList;
