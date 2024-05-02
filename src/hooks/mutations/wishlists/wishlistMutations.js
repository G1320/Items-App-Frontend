import { useMutation, useQueryClient } from '@tanstack/react-query';
import useErrorHandling from '../../ErrorAndSuccessHandling/useErrorHandling';
import {
  addCollectionToWishlist,
  createWishlistAndAddToUser,
  deleteWishlist,
} from '../../../services/wishlist-service';
import { updateWishlist } from '../../../services/wishlist-service';
import { toast } from 'sonner';

export const useCreateWishlistMutation = (userId) => {
  const handleError = useErrorHandling();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newWishlist) => createWishlistAndAddToUser(userId, newWishlist),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['wishlists', variables]);
      toast.success('Wishlist created');
    },
    onError: (error) => handleError(error),
  });
};

export const useDeleteWishlistMutation = (userId) => {
  const handleError = useErrorHandling();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishlistId) => deleteWishlist(userId, wishlistId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['wishlists', variables]);
      toast.success('Wishlist deleted');
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdateWishlistMutation = (wishlistId) => {
  const queryClient = useQueryClient();
  const handleError = useErrorHandling();

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['wishlist', wishlistId]);
  };

  return useMutation({
    mutationFn: (newWishlist) => updateWishlist(wishlistId, newWishlist),
    onSuccess: (data, variables) => {
      invalidateQueries();
      toast.success('Wishlist updated');
    },
    onError: (error) => handleError(error),
  });
};

export const useAddCollectionToWishlistMutation = (collectionId) => {
  const queryClient = useQueryClient();
  const handleError = useErrorHandling();

  return useMutation({
    mutationFn: (wishlistId) => addCollectionToWishlist(collectionId, wishlistId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['wishlist', variables]);
      toast.success('Collection added to wishlist');
    },
    onError: (error) => handleError(error),
  });
};
