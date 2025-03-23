import { useQuery } from '@tanstack/react-query';
import citationService from '../../services/citation.service';

export const useGetAllCitations = () => {
  try {
    const { data } = useQuery({
      queryKey: ['citations'],
      queryFn: () => citationService.getAllCitations(),
      staleTime: 1000 * 60 * 2 // 5 minutes
    });
    return data;
  } catch (error) {
    console.error('getAllCitations error:', error.response?.data?.error || error.message);
  }
};
