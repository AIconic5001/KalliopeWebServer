import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SolImg from '../../../assets/images/Sol_headshot.png';
import DuImg from '../../../assets/images/Du_headshot.png';
import HuyImg from '../../../assets/images/Huy_headshot.png';
import NhatImg from '../../../assets/images/Nhat_headshot.png';
import './styles.scss';

Team.propTypes = {};

const teamMembers = [
  {
    name: 'Huu Quang Nhat Nguyen',
    role: 'Full-Stack Software Engineer',
    image: SolImg,
    work: 'Designs and develops the frontend interface and web server architecture for the entire Kalliope platform, ensuring seamless user experience and system performance.'
  },
  {
    name: 'Du Quang Nguyen',
    role: 'Data Scientist',
    image: DuImg,
    work: 'Specializes in data collection methodologies and creates insightful visualizations that transform complex research metrics into actionable intelligence.'
  },
  {
    name: 'Huy Le',
    role: 'AI Engineer',
    image: HuyImg,
    work: "Fine-tunes the AI models that power Kalliope's core features, developing sophisticated algorithms for research synopsis generation and recommendation systems."
  },
  {
    name: 'Nhat Phan',
    role: 'Data Engineer',
    image: NhatImg,
    work: 'Design the ETL processes and database systems that form the foundation of Kalliope, optimizing data flow and storage for the platform.'
  }
];

function Team() {
  return (
    <Grid container spacing={2} mt={4} mb={4} justifyContent={'space-around'} alignItems={'center'}>
      <Grid size={12} mt={4} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant='h2' color='text.primary' textAlign={'center'}>
          Meet Our Team
        </Typography>
      </Grid>
      {teamMembers.map((member) => (
        <Grid size={5} key={member.name}>
          <Grid className='team-member-container' container spacing={2} justifyContent={'center'} alignItems={'center'}>
            <img src={member.image} alt='Picture here' />
            <Grid size={12}>
              <Typography variant='h4' textAlign={'center'}>
                {member.name}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant='h6' color='text.primary' textAlign={'center'}>
                {member.role}
              </Typography>
            </Grid>

            <Typography variant='body1' textAlign={'justify'}>
              {member.work}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default Team;
