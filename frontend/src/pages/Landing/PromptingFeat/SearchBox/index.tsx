import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSendQuery } from '../../../Recommendations/handleRecommendationApi';
import './styles.scss';
import { useQueryContext } from '../../../../context/QueryContext';

function SearchBox() {
  let navigate = useNavigate();
  const { setQuery } = useQueryContext();
  const { mutate: sendQuery } = useSendQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedFetchData = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 10),
    []
  );

  function handleQueryChange(e: any) {
    e.preventDefault();
    const inputText = e.target.value;
    debouncedFetchData(inputText);
  }

  function handleSearchClick(e: any) {
    e.preventDefault();
    setQuery(searchQuery);
    setTimeout(() => {
      sendQuery(searchQuery);
    }, 100);
    setTimeout(() => {
      navigate('/recommendations');
    }, 200);
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
                  multiline
                  maxRows={2}
                  minRows={1}
                  value={searchQuery}
                  onChange={handleQueryChange}
                  placeholder='Tell us what you are researching'
                  fullWidth
                  sx={{
                    padding: 1,
                    color: 'var(--primary)',
                    lineHeight: '1.5',
                    fontSize: '20px',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                />
              </Grid>
              <IconButton
                aria-label='search'
                onClick={handleSearchClick}
                type='submit'
                sx={{ display: !searchQuery ? 'none' : 'flex' }}
                disabled={!searchQuery}
              >
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
