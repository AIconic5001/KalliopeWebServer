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

  // const data2 = res.data?.data;
  // console.log(data);
  return (
    <div className='synopsis-page-container'>
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
    </div>
  );
}

export default SynopsisPage;
