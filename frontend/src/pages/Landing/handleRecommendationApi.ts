import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_CONFIG } from '../../constants/api.constant';
import recommendationService from '../../services/recommendation.service';

export const usesendKe = () => {
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

export const useSendKeywordQuery = () => {
  const queryClient = useQueryClient();
  const { isPending, isSuccess, mutate, isError } = useMutation({
    mutationKey: ['sendKeywordQuery'],
    mutationFn: (keyword: string) => recommendationService.sendKeywordQuery(keyword),
    onError: (error: any) => {
      console.error('sendKeywordQuery error:', error.response?.data?.error || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_CONFIG.RECOMMENDATIONS_QUERY] });
    }
  });
  return { isPending, isSuccess, mutate, isError };
};
