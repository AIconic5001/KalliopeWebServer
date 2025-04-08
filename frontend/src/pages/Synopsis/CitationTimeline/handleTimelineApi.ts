import { useQuery } from '@tanstack/react-query';

export const useGetCitationTimeline = () => {
  try {
    const { data } = useQuery({
      queryKey: ['citationTimeline'],
      queryFn: () => fetch('/api/timeline/getTimelineData').then((res) => res.json()),
      staleTime: 1000 * 60 * 2 // 5 minutes
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('getCitationTimeline error:', error.response?.data?.error || error.message);
  }
};
