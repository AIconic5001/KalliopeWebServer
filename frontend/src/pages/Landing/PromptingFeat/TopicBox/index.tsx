import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './styles.scss';
import { useNavigate } from 'react-router';
import { useSendQuery } from '../../../Recommendations/handleRecommendationApi';
import { useQueryContext } from '../../../../context/QueryContext';

TopicBox.propTypes = {};

const demoTopic = [
  'Quantum Physics',
  'Mathematical Physics',
  'Phenomenology',
  'Machine Learning',
  'Artificial Intelligence',
  'Statistics Theory',
  'Statistical Mechanics',
  'Quantum Cosmology',
  'Natural Language Processing (NLP)'
];

function TopicBox() {
  const { setQuery } = useQueryContext();

  const dynamicNumOfCol = Math.floor(demoTopic.length / 2);
  const { mutate: sendQuery } = useSendQuery();
  const navigate = useNavigate();
  function handleTopicClick(e: any) {
    e.preventDefault();
    setQuery(e.target.value);
    setTimeout(() => {
      sendQuery(e.target.value);
    }, 100);
    setTimeout(() => {
      navigate('/recommendations');
    }, 200);
  }
  return (
    <div className='topic-box'>
      <Box className='box-container'>
        <Grid container size={12} spacing={12} textAlign={'center'}>
          <Grid container size={12} spacing={2}>
            <Grid size={12}>
              <Typography variant='h3'>Browse by Topic</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant='body1' color='textSecondary'>
                Explore our resources by subject
              </Typography>
            </Grid>
          </Grid>
          <Grid container size={12} spacing={3} textAlign={'center'}>
            {demoTopic.map((topic) => (
              <Grid size={dynamicNumOfCol} textAlign={'center'} key={topic}>
                <Button
                  value={topic}
                  variant='outlined'
                  color='secondary'
                  onClick={handleTopicClick}
                  sx={{ width: '80%' }}
                >
                  {topic}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TopicBox;
