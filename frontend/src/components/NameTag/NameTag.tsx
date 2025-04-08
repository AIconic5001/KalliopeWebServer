import { Typography } from '@mui/material';
import useRandomColor from '../../utils/useRandomColor';
import './styles.scss';

interface NameTagProps {
  data: string;
  defaultColor?: string;
  variant?: 'body2' | 'body1' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: number;
}

function NameTag({ data, defaultColor, size }: NameTagProps) {
  const color = defaultColor ? defaultColor : useRandomColor();
  return (
    <div className='rounded-tag' style={{ border: `1px solid ${color}` }}>
      <Typography variant='body2' sx={{ color: `${color}` }} fontSize={`${size ? size : 12}px`}>
        {data}
      </Typography>
    </div>
  );
}

export default NameTag;
