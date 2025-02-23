import { Box, Dialog, DialogContent, Divider, IconButton, Typography, DialogProps, Button } from '@mui/material';
import { ReactNode } from 'react';
// import Button from '../Button';

export interface PropsPopupcover extends DialogProps {
  btnOpen: ReactNode;
  handleClose: () => void;
  open: boolean;
  children?: ReactNode;
  title: string;
  handleSubmit?: () => void;
  isValid?: boolean;
  isLoading?: boolean;
  handleOpen?: () => void;
}

// Create and update allocation config in one popup to avoid redundant code. Don't separate it
const PopupCover = ({
  btnOpen,
  handleClose,
  open,
  children,
  title,
  handleSubmit,
  isLoading,
  isValid,
  ...rest
}: PropsPopupcover) => {
  return (
    <>
      {btnOpen}
      <Dialog
        {...rest}
        open={open}
        onClose={handleClose}
        sx={
          rest.sx || {
            '& .MuiPaper-root': {
              borderRadius: '8px',
              width: '600px',
              maxHeight: '80vh'
            }
          }
        }
        disableRestoreFocus
      >
        <DialogContent sx={{ padding: '0', boxSizing: 'content-box' }}>
          <form onSubmit={handleSubmit}>
            <Box className='flex flex-col '>
              <Box className='flex justify-between items-center p-4 h-[56px]'>
                <Typography color='var(--text-primary)' variant='h6'>
                  {title}
                </Typography>
                <IconButton aria-label='close' onClick={handleClose}>
                  {/* <IconPhosphor iconName='X' size={20} /> */}
                </IconButton>
              </Box>
              <Divider
                sx={{
                  borderBottom: '1px solid var(--border-color)',
                  width: '100%'
                }}
              />
              {/* <Box className='flex-1  p-4 !important max-h-[calc(80vh-140px)] overflow-y-auto'>{children}</Box> */}
              <Divider
                sx={{
                  borderBottom: '1px solid var(--border-color)',
                  width: '100%'
                }}
              />
              <Box className='flex justify-end items-center p-4 gap-3'>
                <Button
                  variant='outlined'
                  onClick={handleClose}
                  //   startIcon={<IconPhosphor iconName='X' size={18} />}
                >
                  <Typography variant='button3' fontWeight={600}>
                    {'cancel'}
                  </Typography>
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  // onClick={handleSubmit}
                  //   startIcon={<IconPhosphor iconName='Check' size={18} />}
                  //   disabled={!isValid}
                >
                  <Typography variant='button3' fontWeight={600}>
                    {'save'}
                  </Typography>
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupCover;
