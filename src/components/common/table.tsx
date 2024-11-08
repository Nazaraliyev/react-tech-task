import { DataGrid, DataGridProps } from '@mui/x-data-grid';

interface Props extends Omit<DataGridProps, 'rows'> {
  data: any[];
}
const CustomTable = (props: Props) => {
  return (
    <DataGrid {...{ ...props, disableColumnSorting: true, hideFooter: true, disableColumnMenu: true, rows: props.data, columns: props.columns }} />
  );
};

export default CustomTable;
