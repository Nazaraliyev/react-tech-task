import React from 'react';
import styles from './styles.module.css';
import cx from 'classnames';
import { Divider, Modal, Typography } from '@mui/material';
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
  className?: string;
  rootClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
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
    <Modal open={props.open} className={props.rootClassName}>
      <Flex isFullHeight justify="center" className={styles.container}>
        <Loader active={loading}>
          <div className={cx(styles.content, props.className)} style={{ width }}>
            <Flex justify="space-between" align="center" className={props.headerClassName}>
              <Typography>{props.title}</Typography>
              {allowClose && (
                <CustomButton variant="text" className={styles.close_button} onClick={props.onClose}>
                  <IoMdClose size={20} color={'#999'} />
                </CustomButton>
              )}
            </Flex>
            <Divider />
            <div className={props.bodyClassName}>{props.children}</div>
            {props.footer === false
              ? null
              : props.footer || (
                  <Flex justify="flex-end" gap="l" className={props.footerClassName}>
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
