import { Divider, Pagination, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { GridDataType } from '../../@types/SynopsisData/grid.type';
import NameTag from '../NameTag/NameTag';
import './styles.scss';
import ItemCard from '../../pages/Recommendations/ItemCard/ItemCard';
import { mockData } from '../../assets/mock/mockRecommendationList';
import { useState } from 'react';

interface GridTitleType {
  row: GridDataType;
  children?: React.ReactNode;
}

export default function DataGrid({ row, children }: GridTitleType) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          <TableCell component='th' scope='row' width={'60%'} sx={{ marginRight: '10px' }}>
            <TableRow key={'title'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row' width={'20%'}>
                <Typography variant='h5' className='text-color'>
                  Title
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='body1' color='black'>
                  {row.title}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow key={'authors'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row' width={'20%'}>
                <Typography variant='h5' className='text-color'>
                  Authors
                </Typography>
              </TableCell>
              <TableCell align='left'>
                {row.authors.map((author) => (
                  <NameTag key={author} data={author} defaultColor='black' />
                ))}
              </TableCell>
            </TableRow>

            <TableRow key={'publicationDate'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row' width={'20%'}>
                <Typography variant='h5' className='text-color'>
                  Publication Date
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='body1' color='black'>
                  {row.publicationDate.toLocaleDateString()}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow key={'relatedtopics'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row' width={'20%'}>
                <Typography variant='h5' className='text-color'>
                  Related Topics
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ display: 'flex', flexDirection: 'row' }}>
                {row.relatedtopics.map((topic) => (
                  <NameTag key={topic} data={topic} defaultColor='' />
                ))}
              </TableCell>
            </TableRow>
          </TableCell>
          <TableCell scope='colrmn' width={'50%'} sx={{ borderLeft: 1 }}>
            {/* <Grid container spacing={2} sx={{ height: '100%' }}>
              <Grid size={12}>
                <Typography variant='h5' className='text-color'>
                  Next Readings:
                </Typography>
                <Divider />
              </Grid>
              <Grid size={12}>
                <div className='recommendation-list-container'>{children}</div>
              </Grid>
            </Grid> */}
            <TableRow>Row1</TableRow>
            <TableRow>Row2</TableRow>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
