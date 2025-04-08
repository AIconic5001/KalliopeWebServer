import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Pagination, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { GridDataType, RecommendationListProps } from '../../@types/SynopsisData/grid.type';
import { mockData } from '../../assets/mock/mockRecommendationList';
import NameTag from '../../components/NameTag/NameTag';
import ItemCard from './ItemCard/ItemCard';

import './styles.scss';
import { useGetRecommendations } from './handleRecommendationApi';
import LoadingSuspense from '../../components/LoadingSuspense';
import { io } from 'socket.io-client';
import { useQueryContext } from '../../context/QueryContext';
// import FileProcessor from './Components/FileProcessor';
// import { useWebSocket } from '../../utils/useWebSocket';

function Recommedations() {
  const { query } = useQueryContext();
  const res = useGetRecommendations();
  const [recommendations, setRecommendations] = useState<RecommendationListProps[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [data, setData] = useState<RecommendationListProps[]>([]);
  useEffect(() => {
    if (res?.data) {
      console.log(res);
      const recs = res?.data['res'].map((rec: any) => rec);
      setRecommendations(recs);
    }
  }, [res]);

  useEffect(() => {
    const start = (page - 1) * 5;
    const end = start + 5;
    setPageSize(recommendations.length ? Math.ceil(mockData.length / 5) : 1);
    setData(recommendations.slice(start, end));
  }, [page, recommendations]);
  return (
    <div className='recommendations-container'>
      <div className='recommendations-list-header'>
        <div className='recommendations-list-header'>
          <Grid container spacing={0}>
            <Grid size={1} padding={1}>
              <a href='/'>
                <Button variant='contained' startIcon={<ReplyIcon sx={{ color: 'var(--primary-dark' }} />}>
                  Back
                </Button>
              </a>
            </Grid>
            <Grid size={11}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', height: '100%' }}>
                <Typography variant='h3' mr={'20px'}>
                  {`Next readings for`}
                </Typography>
                <Typography variant='h2' mr={'20px'} fontWeight={'light'}>
                  "{`${query}`}"
                </Typography>
                {/* <NameTag data='Topic1' /> */}
                {/* <FileProcessor /> */}
              </div>
            </Grid>
          </Grid>
        </div>
        {recommendations.length ? (
          <div className='recommendation-list-container'>
            <Stack spacing={3}>
              {data.map((data: RecommendationListProps, index: number) => (
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
        ) : (
          <LoadingSuspense />
        )}
      </div>
    </div>
  );
}

export default Recommedations;
