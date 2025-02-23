import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Pagination, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { GridDataType } from '../../@types/SynopsisData/grid.type';
import { mockData } from '../../assets/mock/mockRecommendationList';
import NameTag from '../../components/NameTag/NameTag';
import ItemCard from './Components/ItemCard/ItemCard';

import './styles.scss';
import { useGetRecommendations } from './handleRecommendationApi';

function Recommedations() {
  const res = useGetRecommendations();
  const pageCount = mockData.length ? Math.ceil(mockData.length / 5) : 1;
  const [page, setPage] = useState(1);
  const [data, setData] = useState(mockData.slice(0, 5));
  useEffect(() => {
    setData(res['recommendations'].slice((page - 1) * 5, page * 5));
  }, [res]);
  return (
    <div className='recommendations-container'>
      <div className='back-button-container'>
        <Grid container spacing={2}>
          <Grid>
            <a href='/'>
              <Button variant='contained' startIcon={<ReplyIcon sx={{ color: 'var(--primary-dark' }} />}>
                Back
              </Button>
            </a>
          </Grid>
        </Grid>
      </div>
      <div>
        <div className='recommendations-list-header'>
          <Grid container spacing={0}>
            <Grid size={12}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', height: '100%' }}>
                <Typography variant='h2' mr={'20px'}>
                  Next-to-read List for {'Topic1'}
                </Typography>
                <NameTag data='Topic1' />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className='recommendation-list-container'>
          <Stack spacing={3}>
            {data.map((data: GridDataType, index: number) => (
              <div key={index}>
                <ItemCard {...data} />
              </div>
            ))}
          </Stack>
          <Pagination
            count={pageCount}
            color='primary'
            page={page}
            sx={{
              backgroundColor: 'none',
              padding: '20px'
            }}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              console.log(event);
              setPage(value);
              window.scrollTo(0, 0);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Recommedations;
