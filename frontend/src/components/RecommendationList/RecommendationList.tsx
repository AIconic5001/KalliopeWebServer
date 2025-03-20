import React, { useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import ItemCard from '../../pages/Recommendations/ItemCard/ItemCard';
import { GridDataType } from '../../@types/SynopsisData/grid.type';
import { mockData } from '../../assets/mock/mockRecommendationList';
import './styles.scss';

interface RecommendationListProps {
  recommendations?: GridDataType[];
}

function RecommendationList({ recommendations }: RecommendationListProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [data, setData] = useState(mockData.slice(0, 5));
  return (
    <div className='recommendation-list-container'>
      <Stack spacing={3}>
        {data.map((data: GridDataType, index: number) => (
          <div key={index}>
            <ItemCard {...data} />
          </div>
        ))}
      </Stack>
      <Pagination
        count={pageSize}
        color='primary'
        page={page}
        sx={{
          backgroundColor: 'none',
          padding: '20px'
        }}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}

export default RecommendationList;
