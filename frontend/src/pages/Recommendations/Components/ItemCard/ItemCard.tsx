import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GridDataType } from '../../../../@types/SynopsisData/grid.type';
import NameTag from '../../../../components/NameTag/NameTag';
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
          <CardContent sx={{ height: '80%', width: '100%' }}>
            <Typography variant='h4' component='div' color='text.primary' mb={2}>
              {`Title: ${title}`}
            </Typography>
            <Grid container spacing={1}>
              <Grid size={1}>
                <Typography variant='h5' component='div' color='text.primary' mt={1}>
                  {`Author:`}
                </Typography>
              </Grid>
              <Grid container size={11} direction='row' justifyContent={'flex-start'} textAlign={'center'} mt={1}>
                {authors.map((author: string) => (
                  <NameTag data={author} />
                ))}
              </Grid>
            </Grid>
            <Typography variant='h5' component='div' color='text.primary' mt={1}>
              {`Publication Date: ${publicationDate.toLocaleDateString()}`}
            </Typography>
            <Grid container spacing={1}>
              <Grid size={1}>
                <Typography variant='h5' component='div' color='text.primary' mt={1}>
                  {`Author:`}
                </Typography>
              </Grid>
              <Grid container size={11} direction='row' justifyContent={'flex-start'} textAlign={'center'} mt={1}>
                {relatedtopics.map((topic: string) => (
                  <NameTag data={topic} />
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
