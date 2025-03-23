import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid2';
import { Pagination, Typography } from '@mui/material';
CitationsList.propTypes = {
  citations: PropTypes.array
};

function CitationsList({ citations }) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(citations.length ? Math.ceil(citations.length / 6) : 1);
  const [data, setData] = React.useState(citations.slice(0, 6));
  useEffect(() => {
    const start = (page - 1) * 6;
    const end = start + 6;
    setPageSize(citations.length ? Math.ceil(citations.length / 6) : 1);
    setData(citations.slice(start, end));
  }, [page, citations]);
  return (
    <div className='citations-list'>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} mb={4} mt={4}>
        {data.map((citation, index) => {
          return (
            <Grid key={index} size={10}>
              <Typography variant='body2' textAlign={'justify'} mt={1} mb={1}>
                <i>{citation['citation']}</i>
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        count={pageSize}
        color='primary'
        page={page}
        sx={{
          backgroundColor: 'none',
          padding: '10px'
        }}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}

export default CitationsList;
