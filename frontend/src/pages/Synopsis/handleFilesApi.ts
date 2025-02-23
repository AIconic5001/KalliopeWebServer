import { useQuery } from '@tanstack/react-query';
import synopsisService from '../../services/synopsis.service';

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
