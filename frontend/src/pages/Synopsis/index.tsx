import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { GridDataType, SummariesDataType } from '../../@types/SynopsisData/grid.type';
import { mockData } from '../../assets/mock/mockRecommendationList';
import DataGrid from '../../components/DataGrid/DataGrid';
import LoadingSuspense from '../../components/LoadingSuspense';
import RecommendationList from '../../components/RecommendationList/RecommendationList';
import ButtonGrid from './ButtonGrid/ButtonGrid';
import CardItem from './CardItemList/CardItemList';
import { useGetSummaries } from './handleFilesApi';
import './styles.scss';
import TitleGrid from './TitleGrid/TitleGrid';
// Main component
function SynopsisPage() {
  // const [status, setStatus] = useState('loading');
  const [data, setData] = useState<SummariesDataType>({
    'Conclusion and Implications': '',
    Methodology: '',
    Results: '',
    'Research Problem and Objectives': ''
  });

  const tempRecommendations = mockData.slice(0, 5);

  // Use the custom hook
  // const { socket, isConnected, files, status } = useSocket('http://localhost:8000');

  // Get summaries data
  const res = useGetSummaries();

  // Update data when API response changes
  useEffect(() => {
    if (res?.data) {
      setData(res.data);
    }
  }, [res]);

  const row: GridDataType = {
    title: 'Demo Paper',
    authors: ['Prf. A', 'Prf. B'],
    publicationDate: new Date('08/09/1996'),
    relatedtopics: ['CS', 'AI', 'SWE']
  };

  return (
    <div className='synopsis-page-container'>
      {/* {data && status === 'done' ? ( */}
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
            {/* <DataGrid row={row} children={<RecommendationList recommendations={tempRecommendations} />} /> */}
            <TitleGrid data={row} recommendations={tempRecommendations} />

            <div></div>
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
