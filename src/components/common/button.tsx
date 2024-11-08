import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface Props extends Omit<ButtonProps, 'loading'> {
  loading?: boolean;
}
const CustomButton = ({ children, loading, onClick, variant="contained", color = 'primary', size = 'medium', ...props }: Props) => {
  return !loading ? (
    <Button {...{ ...props, color, variant, size, onClick, children }} />
  ) : (
    <Button {...{ ...props, variant, color, size }}>
      <CircularProgress size={progressSize[size]} style={{ color: progressColor[variant] }} />
    </Button>
  );
};

export default CustomButton;

const progressSize: Record<string, number> = {
  small: 22.75,
  medium: 25,
};
const progressColor: Record<string, string> = {
  contained: '#fff',
  outlined: '#475ed0',
};
