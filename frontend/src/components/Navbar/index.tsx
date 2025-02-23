import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './styles.scss';

Navbar.propTypes = {};

function Navbar() {
  return (
    <header>
      <Grid container spacing={2} justifyContent={'space-between'} className='nav'>
        <Grid size={7}>
          <Typography variant='h4' sx={{ color: 'var(--orange-700)' }}>
            <a href='/'>Kalliope</a>
          </Typography>
        </Grid>
        <Grid textAlign={'right'} size={5} container spacing={0}>
          <Grid size={3}>
            <Typography variant='h6' sx={{ color: 'var(--primary-dark) ' }}>
              <a href='/recommendations'>Recommendations</a>
            </Typography>
          </Grid>
          <Grid size={3}>
            <Typography variant='h6' sx={{ color: 'var(--primary-dark) ' }}>
              <a href='/synopsis'>Synopsis</a>
            </Typography>
          </Grid>
          <Grid size={3}>
            <Typography variant='h6' sx={{ color: 'var(--primary-dark) ' }}>
              <a href='/about'>About Us</a>
            </Typography>
          </Grid>
          <Grid size={3}>
            <Typography variant='h6' sx={{ color: 'var(--primary-dark) ' }}>
              <a href='/citations'>Citations</a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}

export default Navbar;
