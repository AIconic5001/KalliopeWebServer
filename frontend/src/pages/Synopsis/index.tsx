import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { GridDataType, SummariesDataType } from '../../@types/SynopsisData/grid.type';
import DataGrid from '../../components/DataGrid/DataGrid';
import ButtonGrid from './ButtonGrid/ButtonGrid';
import { useGetSummaries } from './handleFilesApi';
import './styles.scss';
import SummariesGrid from './SummariesGrid/SummariesGrid';

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
        <div className='title-container'>
          <Grid container spacing={2}>
            <Grid size={2}>
              <a href='/'>
                <Button variant='outlined' startIcon={<ReplyIcon sx={{ color: 'var(--primary-dark' }} />}>
                  Back
                </Button>
              </a>
            </Grid>
            {/* <Grid size={10}>
              <Typography variant="h3" sx={{ color: "var(--primary)" }}>
                Synopsis
              </Typography>
            </Grid> */}
          </Grid>
        </div>
        <div className='dataGrid-container'>
          <DataGrid row={row} />
        </div>
        {data && (
          <div className='summaries-container'>
            <SummariesGrid data={data} />
          </div>
        )}
        {/* <PdfDisplay /> */}
        <ButtonGrid />
      </Stack>
    </div>
  );
}

export default SynopsisPage;
