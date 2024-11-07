import { HiOutlineInbox } from 'react-icons/hi2';
import Flex from './flex';
import { Typography } from '@mui/material';

interface Props {
  text?: string;
  iconSize?: number;
  className?: string;
  style?: React.CSSProperties;
}
const Empty = ({ text = 'No available data', ...props }: Props) => {
  return (
    <Flex gap={'m'} direction="column" center className={props.className} style={props.style}>
      <HiOutlineInbox size={100} color="#999" />
      <Typography variant="h6" color="#999">
        {text}
      </Typography>
    </Flex>
  );
};

export default Empty;
