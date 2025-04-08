import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import {
  DocumentInfoType,
  GridDataType,
  RecommendationListProps,
  SummariesDataType
} from '../../@types/SynopsisData/grid.type';
import LoadingSuspense from '../../components/LoadingSuspense';
import ButtonGrid from './ButtonGrid/ButtonGrid';
import CardItem from './CardItemList/CardItemList';
import { useGetDocInfo, useGetRecommendations, useGetSummaries } from './handleFilesApi';
import './styles.scss';
import TitleGrid from './TitleGrid/TitleGrid';
// Main component

// interface DocumentInfoType {
function SynopsisPage() {
  const [documentInfo, setDocumentInfo] = useState<DocumentInfoType>({
    title: '',
    authors: '',
    publication: '',
    abstract: ''
  });
  const [data, setData] = useState<SummariesDataType>({
    'Conclusion and Implications': '',
    Methodology: '',
    Results: '',
    'Research Problem and Objectives': ''
  });
  const [recommendations, setRecommendations] = useState<RecommendationListProps[]>([]);

  // Use the custom hook
  const docInfo = useGetDocInfo();
  const res = useGetSummaries();
  const recs = useGetRecommendations();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update data when API response changes
  useEffect(() => {
    if (docInfo?.data) {
      console.log(docInfo.data);
      setDocumentInfo({
        title: docInfo.data[0]['paper_title'],
        authors: docInfo.data[0]['authors'],
        publication: docInfo.data[0]['publication'],
        abstract: docInfo.data[0]['abstract']
      });
    }
  }, [docInfo]);
  useEffect(() => {
    if (res?.data) {
      setData(res.data);
    }
  }, [res]);

  useEffect(() => {
    const recommendationList = recs?.data['res'].map((rec: GridDataType) => rec);
    setRecommendations(recommendationList);
  }, [recs]);

  return (
    <div className='synopsis-page-container'>
      {documentInfo.title ? (
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
            <TitleGrid data={documentInfo} recommendations={recommendations} />
            <div></div>
          </div>
          {data['Conclusion and Implications'] ? <CardItem summariesData={data} /> : <LoadingSuspense />}
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
