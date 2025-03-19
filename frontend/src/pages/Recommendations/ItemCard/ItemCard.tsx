import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GridDataType } from '../../../@types/SynopsisData/grid.type';
import NameTag from '../../../components/NameTag/NameTag';
import './styles.scss';

function ItemCard({ title, authors, publicationDate, relatedtopics }: GridDataType) {
  return (
    <div key={title}>
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
                  {`${title}`}
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
                {authors.map((author: string) => (
                  <NameTag data={author} key={author} />
                ))}
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={1}>
              <Grid size={2}>
                <Typography
                  variant='h5'
                  component='div'
                  color='text.primary'
                  fontSize={'23px'}
                  justifyContent={'flex-start'}
                >
                  {`Publication Date:`}
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
                  {`${new Date(publicationDate).toDateString()}`}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid size={1}>
                <Typography variant='h5' component='div' color='text.primary' mt={1}>
                  {`Topics:`}
                </Typography>
              </Grid>
              <Grid container size={10} direction='row' justifyContent={'flex-start'} textAlign={'center'} mt={1}>
                {relatedtopics.map((topic: string) => (
                  <NameTag data={topic} key={topic} />
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default ItemCard;
