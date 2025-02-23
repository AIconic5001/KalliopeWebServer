import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import './styles.scss';
import { useNavigate } from 'react-router';
import { useSendQuery } from '../../../Recommendations/handleRecommendationApi';
import { send } from 'process';
SearchBox.propTypes = {};

function SearchBox() {
  let navigate = useNavigate();
  const { mutate: sendQuery } = useSendQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedFetchData = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 50),
    []
  );

  function handleQueryChange(e: any) {
    e.preventDefault();
    const inputText = e.target.value;
    debouncedFetchData(inputText);
  }

  function handleSearchClick() {
    sendQuery(searchQuery);
    navigate('/recommendations');
  }
  return (
    <div className='search-box'>
      <Box className='box-container'>
        <form action=''>
          <Grid container size={12} spacing={12} textAlign={'center'}>
            <Grid container size={10} spacing={2}>
              <Grid size={12}>
                <Typography variant='h3'>Search Directly</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant='body1' color='textSecondary'>
                  Ask any question to search database
                </Typography>
              </Grid>
            </Grid>
            <Grid textAlign={'center'} size={12} m={'auto'} container spacing={3}>
              <Grid size={10}>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  startAdornment={
                    <InputAdornment position='start'>
                      <SearchIcon sx={{ color: 'var(--primary)', fontSize: '28px' }} />
                    </InputAdornment>
                  }
                  value={searchQuery}
                  onChange={handleQueryChange}
                  placeholder='Tell us what you are researching'
                  fullWidth
                  sx={{ color: 'var(--primary)', lineHeight: '1.5', fontSize: '20px' }}
                />
              </Grid>
              <IconButton aria-label='search' onClick={handleSearchClick} type='submit' disabled={!searchQuery}>
                <ArrowCircleRightTwoToneIcon
                  sx={{ color: searchQuery ? 'var(--primary)' : 'var(--tertiary)', fontSize: '40px' }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default SearchBox;
