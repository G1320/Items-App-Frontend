import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getCollectionItems } from '../../services/collection-service';

export const useCollectionItems = (collectionId) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['collectionItems', collectionId],
    queryFn: () => getCollectionItems(collectionId),
    placeholderData: () => queryClient.getQueryData(['collectionItems', collectionId]),
  });

  return { data, isLoading, error, refetch };
};
