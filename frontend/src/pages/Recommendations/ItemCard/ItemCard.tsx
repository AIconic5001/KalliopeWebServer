import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { RecommendationListProps } from '../../../@types/SynopsisData/grid.type';
import NameTag from '../../../components/NameTag/NameTag';
import './styles.scss';

function ItemCard({ paper_title, authors, publication, abstract }: RecommendationListProps) {
  function authorsFullList(authors: string) {
    const authorsList = authors.split(',').map((author: string, index: number) => author.trim());
    return authorsList;
  }

  function authorsFullListLength(authors: string) {
    const authorsList = authors.split(',').map((author: string, index: number) => author.trim());
    return authorsList.length;
  }
  return (
    <div key={paper_title}>
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <Card className='card-item'>
          <CardContent sx={{ width: '100%' }}>
            <Grid container spacing={1} mb={1}>
              <Grid size={1}>
                <Typography variant='h4' component='div' color='text.primary'>
                  {`Title:`}
                </Typography>
              </Grid>
              <Grid size={10} direction='row' justifyContent={'flex-start'}>
                <Typography variant='h4' component='div' color='text.secondary'>
                  {`${paper_title}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid size={1}>
                <Typography variant='h5' component='div' color='text.primary' mt={1}>
                  {`Author:`}
                </Typography>
              </Grid>
              <Grid container size={10} direction='row' justifyContent={'flex-start'} textAlign={'center'} mt={1}>
                {authorsFullList(authors).map((author: string) => (
                  <NameTag data={author} key={author} />
                ))}
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={1}>
              <Grid size={1}>
                <Typography
                  variant='h5'
                  component='div'
                  color='text.primary'
                  fontSize={'23px'}
                  justifyContent={'flex-start'}
                >
                  {`Publication:`}
                </Typography>
              </Grid>
              <Grid size={10} direction='row' justifyContent={'flex-start'}>
                <Typography
                  variant='h5'
                  component='div'
                  color='text.secondary'
                  justifyContent={'flex-start'}
                  fontSize={'23px'}
                >
                  {`${publication}`}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid size={1}>
                <Typography variant='h5' component='div' color='text.primary' mt={1}>
                  {`Abstract:`}
                </Typography>
              </Grid>
              <Grid container size={10} direction='row' justifyContent={'flex-start'} textAlign={'left'} mt={1}>
                <Typography variant='body2' component='div' color='text.secondary'>
                  {`${abstract}`}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default ItemCard;
