import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getCollectionById } from '../../services/collection-service';

export const useCollection = (collectionId) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['collection', collectionId],
    queryFn: () => getCollectionById(collectionId),
    initialData: () => queryClient.getQueryData(['collection', collectionId]),
  });

  return { data, isLoading, error, refetch };
};
