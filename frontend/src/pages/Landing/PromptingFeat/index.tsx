import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchBox from './SearchBox';
import './styles.scss';
import TopicBox from './TopicBox';

function PromptingFeat() {
  return (
    <section className='prompt-container' id='prompt'>
      <Grid container spacing={3}>
        <Grid size={12} mb={10}>
          <Typography variant='h1' align='center' className='title'>
            Find your next research papers
          </Typography>
          <Typography variant='body1' align='center'>
            If you have a question, we have the answer. Let us help you find the right research papers for your needs.
          </Typography>
        </Grid>
        <Grid container size={12} spacing={3} flexDirection={'row'}>
          <Grid size={6}>
            <SearchBox />
          </Grid>
          <Grid size={6}>
            <TopicBox />
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}

export default PromptingFeat;
