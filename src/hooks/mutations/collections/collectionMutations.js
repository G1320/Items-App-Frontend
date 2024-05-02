import { useMutation, useQueryClient } from '@tanstack/react-query';
import useErrorHandling from '../../ErrorAndSuccessHandling/useErrorHandling';
import { toast } from 'sonner';

import { createCollection, updateCollection } from '../../../services/collection-service';

export const useCreateCollectionMutation = () => {
  const queryClient = useQueryClient();
  const handleError = useErrorHandling();

  return useMutation({
    mutationFn: ({ userId, newCollection }) => createCollection(userId, newCollection),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['collections']);
      toast.success('Collection created');
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdateCollectionMutation = (collectionId) => {
  const queryClient = useQueryClient();
  const handleError = useErrorHandling();

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['collection', collectionId]);
    queryClient.invalidateQueries(['collections']);
  };

  return useMutation({
    mutationFn: (newCollection) => updateCollection(collectionId, newCollection),
    onSuccess: (data, variables) => {
      invalidateQueries();
      toast.success('Collection updated');
    },
    onError: (error) => handleError(error),
  });
};
