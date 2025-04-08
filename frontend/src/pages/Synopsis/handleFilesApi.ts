import { useQuery } from '@tanstack/react-query';
import synopsisService from '../../services/synopsis.service';
import recommendationService from '../../services/recommendation.service';
import { useFileContext } from '../../context/FileContext';

export const useGetSummaries = () => {
  const { filename } = useFileContext();
  try {
    const { data } = useQuery({
      queryKey: ['summaries'],
      queryFn: () => synopsisService.getSummaries(filename),
      staleTime: 1000 * 60 * 2 // 5 minutes
    });
    return data;
  } catch (error) {
    console.error('getSummaries error:', error.response?.data?.error || error.message);
  }
};

export const useGetDocInfo = () => {
  const { filename } = useFileContext();
  try {
    const { data } = useQuery({
      queryKey: ['docInfo'],
      queryFn: () => synopsisService.getDocInfo(filename),
      staleTime: 1000 * 60 * 2 // 5 minutes
    });
    return data;
  } catch (error) {
    console.error('getDocInfo error:', error.response?.data?.error || error.message);
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
