import { Card, CardActionArea, CardContent, Divider, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { SummariesDataType } from '../../../@types/SynopsisData/grid.type';
import './styles.scss';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

interface CarItemListProps {
  summariesData?: SummariesDataType;
}

export default function CarItemList({ summariesData }: CarItemListProps) {
  const [selectedCard, setSelectedCard] = React.useState<number>(0);

  var keys;
  if (summariesData) {
    keys = Object.keys(summariesData) as Array<keyof typeof summariesData>;
  }
  function handleClick(index: number) {
    if (index < keys.length - 1 && index >= 0) {
      setSelectedCard(index);
    } else {
      setSelectedCard(0);
    }
  }
  return (
    <div className='card-item-list-container'>
      <div className='icon-container'>
        <IconButton
          aria-label='leftIcon'
          onClick={handleClick.bind(null, selectedCard - 1)}
          disabled={selectedCard === 0}
        >
          <ArrowCircleLeftOutlinedIcon fontSize='large' />
        </IconButton>
      </div>

      {keys &&
        keys.map((key, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              justifyContent: 'center'
            }}
            hidden={selectedCard !== index}
          >
            <Card className='card-item'>
              <CardActionArea
                onClick={handleClick.bind(null, index + 1)}
                // data-active={selectedCard === index ? '' : undefined}
              >
                <CardContent sx={{ height: '80%', width: '100%' }}>
                  <Typography variant='h5' component='div' color='text.primary' mb={2} mt={1}>
                    {key}
                  </Typography>
                  <Divider />
                  {summariesData[key] && (
                    <Typography variant='body2' color='text.secondary' mt={2} textAlign={'justify'}>
                      {summariesData[key]}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}

      <div className='icon-container'>
        <IconButton
          aria-label='rightIcon'
          onClick={handleClick.bind(null, selectedCard + 1)}
          disabled={selectedCard === 3}
          size='large'
        >
          <ArrowCircleRightOutlinedIcon fontSize='large' />
        </IconButton>
      </div>
    </div>
  );
}
