import { useQuery } from "@tanstack/react-query";
import synopsisService from "../../services/synopsis.service";

export const useGetSummaries = () => {
  const { data } = useQuery({
    queryKey: ["summaries"],
    queryFn: () => synopsisService.getSummaries(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return data;
};
