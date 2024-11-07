import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface Props extends Omit<ButtonProps, 'loading'> {
  loading?: boolean;
}
const CustomButton = ({ children, loading, onClick, variant="contained", color = 'primary', size = 'small', ...props }: Props) => {
  return !loading ? (
    <Button {...{ ...props, color, variant, size, onClick, children }} />
  ) : (
    <Button {...{ ...props, variant, color, size }}>
      <CircularProgress size={progressSize[size]} style={{ color: progressColor[color] }} />
    </Button>
  );
};

export default CustomButton;

const progressSize: Record<string, number> = {
  small: 22.75,
};
const progressColor: Record<string, string> = {
  primary: '#fff',
  secondary: '#fff',
};
