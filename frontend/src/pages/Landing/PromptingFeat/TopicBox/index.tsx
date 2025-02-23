import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './styles.scss';
import { useNavigate } from 'react-router';
import { useSendQuery } from '../../../Recommendations/handleRecommendationApi';
import { send } from 'process';

TopicBox.propTypes = {};

const demoTopic = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5', 'Topic 6', 'Topic 7', 'Topic 8'];

function TopicBox() {
  const dynamicNumOfCol = Math.floor(demoTopic.length / 2);
  const { mutate: sendQuery } = useSendQuery();
  const navigate = useNavigate();
  function handleTopicClick(e: any) {
    sendQuery(e.target.value);
    navigate('/recommendations');
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
