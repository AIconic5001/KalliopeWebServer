import { Box, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Img from '../../assets/images/demoPic.png';
import Team from './Team/Team';
import './styles.scss';

AboutPage.propTypes = {};

function AboutPage() {
  return (
    <div className='about-page-container'>
      <Stack spacing={2} mt={8} mb={4}>
        <Box className='about-page-header'>
          <img
            style={{ width: '50%', marginBottom: '24px' }}
            src={Img}
            alt='Kalliope'
            className='about-page-header-image'
          />
          <Typography variant='h1' color='text.primary'>
            About Kalliope
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Your AI-Powered Research Assistant
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2} justifyContent={'space-around'} alignItems={'center'} mb={4} mt={4}>
            <Grid size={5}>
              <Typography variant='h2' color='text.primary'>
                Our Vision
              </Typography>
              <Divider />
              <Typography variant='body1' textAlign={'justify'} mt={1}>
                Kalliope aims to revolutionize the academic research landscape by providing an intelligent, user-centric
                tool for literature discovery and application. Unlike existing tools, our application not only
                identifies relevant research but also generates concise synopses for each paper, empowering users to
                quickly grasp essential insights and make well-informed decisions.
              </Typography>
            </Grid>
            <Grid size={5}>
              <Typography variant='h2' color='text.primary'>
                Our Mission
              </Typography>
              <Divider />
              <Typography variant='body1' textAlign={'justify'} mt={1}>
                Kalliope's mission is to empower researchers, students, and professionals across disciplines by
                providing an AI-driven platform that simplifies access to academic literature, generates insightful
                synopses, and delivers personalized recommendations. We are committed to developing intuitive tools that
                streamline the research process, foster collaboration, and democratize knowledge by making complex
                academic content more accessible to all.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Team />
      </Stack>
    </div>
  );
}

export default AboutPage;
