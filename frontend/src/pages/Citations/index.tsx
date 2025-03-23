import { useEffect, useState } from 'react';
import { useGetAllCitations } from './handleCitationApi';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import './styles.scss';
import CitationsList from './CitationsList/CitationsList';

function Citations() {
  const [citations, setCitations] = useState([]);
  const res = useGetAllCitations();
  useEffect(() => {
    if (res?.data) {
      console.log('Citations:', res?.data['citations']);
      setCitations(res?.data['citations']);
    }
  }, [res]);
  return (
    <div className='citations-page-container'>
      <Grid className='citations-page-title' justifyContent={'center'} alignItems={'center'} mt={4} mb={8}>
        <Typography variant='h1' color='text.primary' textAlign={'center'}>
          Citations
        </Typography>
        <Typography variant='body1' color='text.secondary' textAlign={'center'}>
          This section lists all the research papers used in training, testing, and any other aspects of the model
          development process.
        </Typography>
      </Grid>
      <div className='citations-list'>
        <CitationsList citations={citations} />
      </div>
    </div>
  );
}

export default Citations;
