import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { GridDataType, SummariesDataType } from '../../@types/SynopsisData/grid.type';
import DataGrid from '../../components/DataGrid/DataGrid';
import ButtonGrid from './ButtonGrid/ButtonGrid';
import CardItem from './CardItemList/CardItemList';
import { useGetSummaries } from './handleFilesApi';
import './styles.scss';
import { useNavigate, useParams } from 'react-router';
import LoadingSuspense from '../../components/LoadingSuspense';

// Rest of code.
SynopsisPage.propTypes = {};

const row: GridDataType = {
  title: 'Demo Paper',
  authors: ['Prf. A', 'Prf. B'],
  publicationDate: new Date('08/09/1996'),
  relatedtopics: ['CS', 'AI', 'SWE']
};

function SynopsisPage() {
  // const queryClient = useQueryClient();
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState<SummariesDataType>({
    'Conclusion and Implications': '',
    Methodology: '',
    Results: '',
    'Research Problem and Objectives': ''
  });

  const res = useGetSummaries();

  useEffect(() => {
    setData(res?.data);
  }, [res]);

  return (
    <div className='synopsis-page-container'>
      {data ? (
        <Stack spacing={6} mt={8}>
          <div className='title-container'></div>
          <div className='dataGrid-container'>
            <div className='back-button-container'>
              <Grid container spacing={2}>
                <Grid>
                  <a href='/'>
                    <Button variant='outlined' startIcon={<ReplyIcon sx={{ color: 'var(--primary-dark' }} />}>
                      Back
                    </Button>
                  </a>
                </Grid>
              </Grid>
            </div>
            <DataGrid row={row} />
            <div> </div>
          </div>

          <CardItem summariesData={data} />

          {/* <PdfDisplay /> */}
          <div className='dataGrid-container'>
            <div></div>
            <ButtonGrid />
          </div>
        </Stack>
      ) : (
        <LoadingSuspense />
      )}
    </div>
  );
}

export default SynopsisPage;
