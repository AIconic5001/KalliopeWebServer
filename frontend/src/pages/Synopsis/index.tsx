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

  const [result, setResult] = useState(null);
  const { fileName } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkStatus = async () => {
  //     try {
  //       const response = await fetch(`/api/check-status/${fileName}`);

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch status');
  //       }

  //       const data = await response.json();

  //       if (data.status === 'completed') {
  //         setStatus('completed');
  //         setResult(data.result);
  //       } else if (data.status === 'failed') {
  //         setStatus('failed');
  //       } else {
  //         // Continue polling
  //         setTimeout(checkStatus, 2000);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setStatus('failed');
  //     }
  //   };

  //   checkStatus();

  //   return () => {
  //     // Cleanup function to handle component unmount
  //   };
  // }, [__filename]);

  // const handleRetry = () => {
  //   navigate('/upload');
  // };

  // if (status === 'loading') {
  //   return (
  //     <div className='text-center'>
  //       <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
  //       <p className='mt-4'>Processing your file...</p>
  //     </div>
  //   );
  // }

  // if (status === 'failed') {
  //   return (
  //     <div className='text-center'>
  //       <p className='text-red-500'>Processing failed</p>
  //       <button onClick={handleRetry} className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'>
  //         Try Again
  //       </button>
  //     </div>
  //   );
  // }

  // const data2 = res.data?.data;
  // console.log(data);
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
