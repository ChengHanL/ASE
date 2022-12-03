import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styles from "../styles/components/Table.module.css";

const DataTable = (prop) =>  {
    const {id, rows, cols} = prop;
    return (
    <div className={`${styles.table} table`}>
        <DataGrid
        rows={rows}
        columns={cols}
        getRowId={(r) => r.AccountID}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        />
    </div>
    );
}

export default DataTable;