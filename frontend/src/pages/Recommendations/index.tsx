import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Pagination, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { GridDataType } from '../../@types/SynopsisData/grid.type';
import { mockData } from '../../assets/mock/mockRecommendationList';
import NameTag from '../../components/NameTag/NameTag';
import ItemCard from './ItemCard/ItemCard';

import './styles.scss';
import { useGetRecommendations } from './handleRecommendationApi';
import LoadingSuspense from '../../components/LoadingSuspense';
import { io } from 'socket.io-client';
// import FileProcessor from './Components/FileProcessor';
// import { useWebSocket } from '../../utils/useWebSocket';

function Recommedations() {
  // const socket = io('http://localhost:8000', { autoConnect: false });
  // useEffect(() => {
  //   socket.connect();
  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket server');
  //   });
  //   socket.on('file_status_update', (data: any) => {
  //     console.log('Received file status update:', data);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  const res = useGetRecommendations();
  const [recommendations, setRecommendations] = useState<GridDataType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [data, setData] = useState(mockData.slice(0, 5));
  useEffect(() => {
    if (res?.data) {
      const recs = res?.data['recommendations'].map((rec: GridDataType) => rec);
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
            <Grid size={10}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', height: '100%' }}>
                <Typography variant='h2' mr={'20px'}>
                  Next readings for {'Topic1'}
                </Typography>
                <NameTag data='Topic1' />
                {/* <FileProcessor /> */}
              </div>
            </Grid>
          </Grid>
        </div>
        {recommendations.length ? (
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
        ) : (
          <LoadingSuspense />
        )}
      </div>
    </div>
  );
}

export default Recommedations;
