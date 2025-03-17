import { Box, Dialog, DialogContent, DialogProps, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';
import './styles.scss';

interface PropsPopup extends DialogProps {
  btnOpen: ReactNode;
  handleClose: () => void;
  open: boolean;
  children?: JSX.Element;
  title: string;
}

function Popup({ btnOpen, handleClose, open, children, title, ...rest }: PropsPopup) {
  return (
    <div>
      {btnOpen}
      <Dialog open={open} onClose={handleClose} keepMounted aria-describedby='dialog-popup' className='popup' {...rest}>
        <DialogContent sx={{ padding: '0', boxSizing: 'content-box' }}>
          <Box className='flex flex-col '>
            <Box className='flex justify-between items-center p-4' style={{ height: '60px' }}>
              <Typography color='var(--primary-dark)' variant='h6'>
                {title}
              </Typography>
              <IconButton aria-label='close' onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider
              sx={{
                borderBottom: '1px solid var(--border-color)',
                width: '100%'
              }}
            />
            <Box className='flex-1  p-4 !important max-h-[calc(80vh-140px)] overflow-y-auto'>{children}</Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Popup;
