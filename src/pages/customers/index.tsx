import { CustomButton } from '@/components/common';
import { TablePage, CustomerModal } from '@/components/partials';
import React from 'react';
import { IoAdd } from 'react-icons/io5';

const CustomerPage = () => {
  return (
    <>
      <TablePage extras={<Create />} />
    </>
  );
};

export default CustomerPage;

const Create = () => {
  // States
  const [open, setOpen] = React.useState(false);

  // Functions
  const toggleModal = (type:"open" | "close") => () => setOpen(type === "open");
  const onSubmit = (data:any) => {
  }

  return (
    <>
      <CustomButton startIcon={<IoAdd />} onClick={toggleModal("open")}>Create</CustomButton>
      <CustomerModal {...{open,onSubmit, onClose:toggleModal("close")}} />
    </>
  );
};
