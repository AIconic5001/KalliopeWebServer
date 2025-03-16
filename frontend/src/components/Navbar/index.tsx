import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './styles.scss';

Navbar.propTypes = {};

function Navbar() {
  return (
    <header>
      <div>
        <Grid container spacing={2} justifyContent={'space-between'} className='nav'>
          <Grid size={7}>
            <Typography variant='h5' sx={{ color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '2rem' }}>
              <a href='/'>Kalliope</a>
            </Typography>
          </Grid>
          <Grid textAlign={'right'} size={5} container spacing={0} justifyContent={'space-between'}>
            <Grid size={3}>
              <Typography variant='h6' sx={{ color: 'var(--primary-dark)' }}>
                <a href='/about'>About Us</a>
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant='h6' sx={{ color: 'var(--primary-dark)' }}>
                <a href='/citations'>Citations</a>
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant='h6' sx={{ color: 'var(--primary-dark)' }}>
                <a href='#contacts'>Contacts</a>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}

export default Navbar;
