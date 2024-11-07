import React from 'react';
import styles from './styles.module.css';
import { CircularProgress, Divider, Modal, Typography } from '@mui/material';
import Flex from '../flex';
import CustomButton from '../button';
import { IoMdClose } from 'react-icons/io';
import Loader from '../loader';

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode | React.ReactNode[];
  form?: string;
  footer?: React.ReactNode | false;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  allowClose?: boolean;
  width?: number;
  loading?: boolean;
}
const CustomModal = ({
  width = 440,
  loading = false,
  allowClose = true,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  ...props
}: Props) => {
  return (
    <Modal open={props.open}>
      <Flex isFullHeight justify="center" className={styles.container}>
        <Loader active={loading}>
          <div className={styles.content} style={{ width }}>
            <Flex justify="space-between" align="center">
              <Typography>{props.title}</Typography>
              {allowClose && (
                <CustomButton variant="text" className={styles.close_button} onClick={props.onClose}>
                  <IoMdClose size={20} color={'#999'} />
                </CustomButton>
              )}
            </Flex>
            <Divider />
            <div>{props.children}</div>
            {props.footer === false
              ? null
              : props.footer || (
                  <Flex justify="flex-end" gap="l">
                    {allowClose && (
                      <CustomButton variant="text" type="reset" form={props.form} className={styles.cancel_button} onClick={props.onClose}>
                        {cancelButtonText}
                      </CustomButton>
                    )}
                    <CustomButton type="submit" form={props.form} onClick={props.onConfirm}>
                      {confirmButtonText}
                    </CustomButton>
                  </Flex>
                )}
          </div>
        </Loader>
      </Flex>
    </Modal>
  );
};

export default CustomModal;
