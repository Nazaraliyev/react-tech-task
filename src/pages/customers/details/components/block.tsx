import styles from '../styles.module.css';
import { Flex, FormItem } from '@/components/common';
import { TextField, Typography } from '@mui/material';
import { Control } from 'react-hook-form';

interface Props {
  title: string;
  control: Control<any, any>;
  fields: any[];
}
const CustomerBlock = (props: Props) => {
  return (
    <Flex gap={'l'} direction="column">
      <Typography variant="h6">{props.title}</Typography>
      <form>
        <Flex wrap gap={'m'}>
          {props.fields.map((item) => (
            <FormItem key={item.name} control={props.control} name={item.name} className={styles.info_field}>
              <TextField size="small" label={item.label} />
            </FormItem>
          ))}
        </Flex>
      </form>
    </Flex>
  );
};

export default CustomerBlock;
