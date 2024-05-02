import { useMutation, useQueryClient } from '@tanstack/react-query';
import useErrorHandling from '../../ErrorAndSuccessHandling/useErrorHandling';
import {
  addItemToCart,
  removeItemFromCart,
  deleteUserCart,
  updateUserCart,
  addItemsToCart,
  removeItemsFromCart,
} from '../../../services/cart-service';

import { toast } from 'sonner';
import { getLocalUser } from '../../../services/user-service';

export const useAddItemToCartMutation = () => {
  const user = getLocalUser();
  const handleError = useErrorHandling();
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['cart', user._id]);
  };

  return useMutation({
    mutationFn: (item) => addItemToCart(user._id, item),
    onSuccess: (data, variables) => {
      invalidateQueries();
      toast.success('Item added to cart', {
        action: {
          label: 'Undo',
          onClick: () => {
            removeItemFromCart(user._id, variables)
              .then(() => invalidateQueries())
              .catch((error) => handleError(error));
          },
        },
      });
    },
    onError: (error) => {
      console.log('error: ', error);
      handleError(error);
    },
  });
};

export const useAddItemsToCartMutation = () => {
  const user = getLocalUser();
  const handleError = useErrorHandling();
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['cart', user._id]);
  };

  return useMutation({
    mutationFn: (newItems) => addItemsToCart(user._id, newItems),
    onSuccess: (data, variables) => {
      invalidateQueries();
      toast.success('Item added to cart', {
        action: {
          label: 'Undo',
          onClick: () => {
            removeItemsFromCart(user._id, variables)
              .then(() => invalidateQueries())
              .catch((error) => handleError(error));
          },
        },
      });
    },
    onError: (error) => handleError(error),
  });
};

export const useRemoveItemFromCartMutation = () => {
  const user = getLocalUser();
  const handleError = useErrorHandling();
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['cart', user._id]);
  };

  return useMutation({
    mutationFn: (itemId) => removeItemFromCart(user._id, itemId),
    onSuccess: (data, variables) => {
      invalidateQueries();
      toast.success('Item removed from cart', {
        action: {
          label: 'Undo',
          onClick: () => {
            addItemToCart(user._id, variables)
              .then(() => invalidateQueries())
              .catch((error) => handleError(error));
          },
        },
      });
    },
    onError: (error) => handleError(error),
  });
};

export const useDeleteUserCartMutation = () => {
  const user = getLocalUser();
  const handleError = useErrorHandling();
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['cart', user._id]);
  };

  return useMutation({
    mutationFn: () => deleteUserCart(user._id),
    onSuccess: (data, variables) => {
      invalidateQueries();
      toast.success('Cart cleared', {
        action: {
          label: 'Undo',
          onClick: () => {
            addItemsToCart(user._id, data)
              .then(() => invalidateQueries())
              .catch((error) => handleError(error));
          },
        },
      });
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdateCartMutation = () => {
  const user = getLocalUser();
  const queryClient = useQueryClient();
  const handleError = useErrorHandling();

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['cart', user._id]);
  };

  return useMutation({
    mutationFn: (newCart) => updateUserCart(user._id, newCart),
    onSuccess: (data, variables) => {
      invalidateQueries();
      toast.success('Cart updated');
    },
    onError: (error) => handleError(error),
  });
};
