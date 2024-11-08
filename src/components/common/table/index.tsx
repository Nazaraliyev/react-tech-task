import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import styles from './styles.module.css';
import cx from 'classnames';

interface Props extends Omit<DataGridProps, 'rows'> {
  data: any[];
}
const CustomTable = (props: Props) => {
  return (
    <DataGrid
      {...{
        ...props,
        className: cx(styles.container, props.className),
        disableColumnSorting: true,
        hideFooter: true,
        disableColumnMenu: true,
        rows: props.data,
        columns: props.columns,
      }}
    />
  );
};

export default CustomTable;
