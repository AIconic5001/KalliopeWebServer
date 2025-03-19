import { Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { GridDataType, SummariesDataType } from '../../../@types/SynopsisData/grid.type';
import './styles.scss';
import NameTag from '../../../components/NameTag/NameTag';
import ItemCard from '../../Recommendations/ItemCard/ItemCard';

interface TitleGridProps {
  data: GridDataType;
  recommendations?: GridDataType[];
}

function TitleGrid({ data, recommendations }: TitleGridProps) {
  function handleClick() {
    console.log('clicked');
  }
  return (
    <div className='title-grid-container'>
      <Grid container spacing={2}>
        <Grid container size={7} padding={2}>
          <Grid container size={12} height={'30%'}>
            <Grid size={4}>
              <Typography variant='h3' color='text.primary'>
                {'Title:'}
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant='h5'>{data.title}</Typography>
            </Grid>
          </Grid>
          <Grid container height={'50%'}>
            <Grid container size={12} height={'fit-content'}>
              <Grid size={4}>
                <Typography variant='h4' color='text.primary'>
                  {'Author:'}
                </Typography>
              </Grid>
              <Grid size={8} alignContent={'center'}>
                {data.authors.map((author) => (
                  <NameTag key={author} data={author} defaultColor='black' />
                ))}
              </Grid>
            </Grid>
            <Grid container size={12} height={'fit-content'}>
              <Grid size={4}>
                <Typography variant='h4' color='text.primary'>
                  {'Publication:'}
                </Typography>
              </Grid>
              <Grid size={8}>
                <Typography variant='body1' color='black' margin={1}>
                  {data.publicationDate.toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
            <Grid container size={12} height={'fit-content'}>
              <Grid size={4}>
                <Typography variant='h4' color='text.primary'>
                  {'Topics:'}
                </Typography>
              </Grid>
              <Grid size={8}>
                <Typography variant='body1'>
                  {data.relatedtopics.map((topic) => (
                    <NameTag key={topic} data={topic} defaultColor='' />
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={5} sx={{ borderLeft: 0.5, borderColor: 'var(--primary-dark)' }} padding={2}>
          <Grid container size={12} sx={{ height: '355px', marginBottom: '10px' }}>
            <Grid size={12}>
              <Typography variant='h5' color='text.primary' mb={2}>
                Top 5 Next Readings:
              </Typography>
              <Divider />
            </Grid>
            <Grid size={12} sx={{ height: '90%', overflowY: 'scroll' }} padding={2}>
              <div className='recommendation-list-container'>
                {recommendations?.length ? (
                  recommendations.map((data: GridDataType, index: number) => (
                    <Grid
                      container
                      spacing={0}
                      className='recommendation'
                      key={index}
                      mb={'20px'}
                      onClick={handleClick}
                    >
                      <Grid container size={12}>
                        <Grid size={2}>
                          <Typography variant='h6' component='div' color='text.primary'>
                            {`Title:`}
                          </Typography>
                        </Grid>
                        <Grid size={9} justifyContent={'flex-start'}>
                          <Typography variant='h6' component='div' color='text.secondary'>
                            {`${data.title}`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={12}>
                        <Grid size={2} pt={1} pb={1}>
                          <Typography variant='h6' component='div' color='text.primary'>
                            {`Topics:`}
                          </Typography>
                        </Grid>
                        <Grid container size={10} direction='row' justifyContent={'flex-start'} textAlign={'center'}>
                          {data.relatedtopics.map((topic: string) => (
                            <NameTag data={topic} key={topic} />
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <Typography variant='body1'>No recommendations available</Typography>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default TitleGrid;
