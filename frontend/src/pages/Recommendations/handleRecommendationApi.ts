import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../../constants/api.constant';
import recommendationService from '../../services/recommendation.service';

export const useSendQuery = () => {
  const queryClient = useQueryClient();
  const { isPending, isSuccess, mutate, isError } = useMutation({
    mutationKey: ['sendQuery'],
    mutationFn: (query: string) => recommendationService.sendQuery(query),
    onError: (error: any) => {
      console.error('sendQuery error:', error.response?.data?.error || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_CONFIG.RECOMMENDATIONS_QUERY] });
    }
  });
  return { isPending, isSuccess, mutate, isError };
};

export const useGetRecommendations = () => {
  try {
    const { data } = useQuery({
      queryKey: ['recommendations'],
      queryFn: () => recommendationService.getRecommendations(),
      staleTime: 1000 * 60 * 2 // 5 minutes
    });
    return data;
  } catch (error) {
    console.error('getRecommendations error:', error.response?.data?.error || error.message);
  }
};
