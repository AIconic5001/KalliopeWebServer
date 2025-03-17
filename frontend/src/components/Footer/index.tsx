import { Typography } from '@mui/material';
import './styles.scss';
import logoImg from '../../assets/images/K.png';
Footer.propTypes = {};

function Footer() {
  return (
    <div className='footer'>
      <div className='grid-container'>
        <img className='logo' src='../../../public/K.png' alt='' />
        <div className='contact-container'>
          <Typography variant='body2' color='var(--primary-dark)' style={{ fontWeight: 'bold' }}>
            Contacts:
          </Typography>
          <Typography variant='body2'>
            <strong>Lead:</strong> Huu Quang Nhat Nguyen
          </Typography>
          <Typography variant='body2'>
            <strong>Email:</strong> nguye2hq@mail.uc.edu
          </Typography>
        </div>
      </div>

      <div className='grid-container2'>
        <Typography variant='body1'>2025 Kalliope &copy; All Rights Reserved</Typography>
      </div>
    </div>
  );
}

export default Footer;
