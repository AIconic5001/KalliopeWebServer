import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { DocumentInfoType, RecommendationListProps } from '../../../@types/SynopsisData/grid.type';
import NameTag from '../../../components/NameTag/NameTag';
import './styles.scss';

interface TitleGridProps {
  data: DocumentInfoType;
  recommendations?: RecommendationListProps[];
}

function TitleGrid({ data, recommendations }: TitleGridProps) {
  function handleClick() {
    console.log('clicked');
  }

  function authorsFullList(authors: string) {
    const authorsList = authors.split(',').map((author: string, index: number) => author.trim());
    return authorsList;
  }

  function authorsFullListLength(authors: string) {
    const authorsList = authors.split(',').map((author: string, index: number) => author.trim());
    return authorsList.length;
  }

  return (
    <div className='title-grid-container'>
      <Grid container spacing={2}>
        <Grid container size={7} padding={2}>
          <Grid container size={12} height={'20%'}>
            <Grid size={4}>
              <Typography variant='h3' color='text.primary'>
                {'Title:'}
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant='h5'>{data.title}</Typography>
            </Grid>
          </Grid>
          <Grid container gap={0}>
            <Grid container size={12} height={'fit-content'}>
              <Grid size={4}>
                <Typography variant='h4' color='text.primary'>
                  {'Author:'}
                </Typography>
              </Grid>
              <Grid size={8} alignContent={'center'}>
                {authorsFullList(data.authors).map((author) => (
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
                <Typography variant='h6' color='black' margin={1}>
                  {data.publication.toString()}
                </Typography>
              </Grid>
            </Grid>
            <Grid container size={12} height={'fit-content'}>
              <Grid size={4}>
                <Typography variant='h4' color='text.primary'>
                  {'Abstract:'}
                </Typography>
              </Grid>
              <Grid size={8}>
                <Typography variant='body2' color='black' margin={1} fontSize={10} lineHeight={1.1}>
                  {data.abstract}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={5} sx={{ borderLeft: 0.5, borderColor: 'var(--primary)' }} padding={2}>
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
                  recommendations.map((data: RecommendationListProps, index: number) => (
                    <Grid
                      container
                      spacing={0}
                      className='recommendation'
                      key={index}
                      mb={'20px'}
                      onClick={handleClick}
                    >
                      <Grid container size={12} padding={1}>
                        <Grid size={2} mb={1}>
                          <Typography variant='h6' component='div' color='text.primary' textAlign={'left'}>
                            {`Title:`}
                          </Typography>
                        </Grid>
                        <Grid size={10} justifyContent={'flex-start'}>
                          <Typography variant='body1' component='div' color='text.secondary'>
                            {`${data.paper_title}`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={12}>
                        <Grid size={2} pt={1} pb={1} mr={'5px'}>
                          <Typography variant='h6' component='div' color='text.primary'>
                            {`Authors:`}
                          </Typography>
                        </Grid>
                        <Grid container size={9} direction='row' justifyContent={'flex-start'} textAlign={'center'}>
                          {authorsFullList(data.authors)
                            .splice(0, 2)
                            .map((author: string, index: number) => (
                              <Grid key={index} size={4} ml={'10px'}>
                                <NameTag data={author} defaultColor='black' size={11} />
                              </Grid>
                            ))}

                          {authorsFullListLength(data.authors) > 2 && (
                            <Grid size={1} ml={'10px'}>
                              <MoreHorizIcon fontSize='small' color='primary' />
                            </Grid>
                          )}
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
