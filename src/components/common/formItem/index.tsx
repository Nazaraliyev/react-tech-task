import React from 'react';
import styles from './styles.module.css';
import cx from 'classnames';
import { Controller, ControllerFieldState, RegisterOptions } from 'react-hook-form';
import { Typography } from '@mui/material';
import Flex from '../flex';

interface Props {
  name: string;
  children: React.ReactNode;
  control: any;
  rules?: RegisterOptions;
  onChange?: (name: string, value: any) => void;
  className?: string;
}

const FormItem = (props: Props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field, fieldState }) => {
        return (
          <Flex direction="column" gap={'s'} className={props.className}>
            {React.Children.map(props.children, (child: any) => {
              return React.cloneElement(child, {
                value: field.value,
                onChange: field.onChange,
                onBlur: field.onBlur,
                error: !!fieldState?.error,
                InputLabelProps: {
                  shrink: ![undefined,null, ''].includes(field.value) || child?.props?.type === "date" ,
                },
              });
            })}
            <Error fieldState={fieldState} />
          </Flex>
        );
      }}
    />
  );
};

export default FormItem;

const Error = (props: { fieldState: ControllerFieldState }) => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [show, setShow] = React.useState(false);

  // Effects
  React.useEffect(() => {
    setShow(!!props.fieldState.error);
    setTimeout(() => { setError(props.fieldState.error?.message) }, 100); // prettier-ignore
  }, [props.fieldState]);

  return (
    <Typography color="error" className={cx(styles.error, { [styles['error--show']]: !!show })}>
      {error}
    </Typography>
  );
};
