import { Typography } from '@mui/material';
import useRandomColor from '../../utils/useRandomColor';
import './styles.scss';

interface NameTagProps {
  data: string;
  defaultColor?: string;
}

function NameTag({ data, defaultColor }: NameTagProps) {
  const color = defaultColor ? defaultColor : useRandomColor();
  return (
    <div className='rounded-tag' style={{ border: `1px solid ${color}` }}>
      <Typography variant='body1' sx={{ color: `${color}` }}>
        {data}
      </Typography>
    </div>
  );
}

export default NameTag;
