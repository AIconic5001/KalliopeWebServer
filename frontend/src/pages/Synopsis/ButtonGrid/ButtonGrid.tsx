import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './styles.scss';
import { useState } from 'react';
import CitationTimeline from '../CitationTimeline/CitationTimeline';
import Popup from '../Popup/Popup';
ButtonGrid.propTypes = {};

function ButtonGrid() {
  const [openSynopsis, setOpenSynopsis] = useState(false);
  const [openTimeline, setOpenTimeline] = useState(false);
  const handleClose = () => {
    setOpenTimeline(false);
    setOpenSynopsis(false);
  };

  return (
    <div className='button-grid-container'>
      <Grid container spacing={2} justifyContent='space-between'>
        <Grid size={4}>
          <Popup
            btnOpen={
              <Button variant='outlined' color='secondary' fullWidth onClick={() => setOpenSynopsis(true)}>
                View Full Synopsis
              </Button>
            }
            open={openSynopsis}
            title={'Full Synopsis'}
            handleClose={handleClose}
          />
        </Grid>
        <Grid size={4} textAlign={'center'}>
          <Popup
            btnOpen={
              <Button variant='outlined' color='secondary' fullWidth onClick={() => setOpenTimeline(true)}>
                CitationTimeline
              </Button>
            }
            open={openTimeline}
            title={'Citation Timeline'}
            handleClose={handleClose}
            children={<CitationTimeline />}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ButtonGrid;
