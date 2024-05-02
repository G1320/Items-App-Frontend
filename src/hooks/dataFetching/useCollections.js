import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCollections } from '../../services/collection-service';

export const useCollections = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['collections', {}],
    queryFn: () => getCollections(),
    initialData: () => queryClient.getQueryData(['collections']),
  });

  return { data, isLoading, error, refetch };
};
