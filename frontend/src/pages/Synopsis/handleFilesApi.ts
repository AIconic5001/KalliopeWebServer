import { useQuery } from '@tanstack/react-query';
import synopsisService from '../../services/synopsis.service';
import recommendationService from '../../services/recommendation.service';

export const useGetSummaries = () => {
  try {
    const { data } = useQuery({
      queryKey: ['summaries'],
      queryFn: () => synopsisService.getSummaries(),
      staleTime: 1000 * 60 * 2 // 5 minutes
    });
    return data;
  } catch (error) {
    console.error('getSummaries error:', error.response?.data?.error || error.message);
  }
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
