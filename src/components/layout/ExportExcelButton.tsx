<<<<<<< Updated upstream
import React from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

type ExportExcelButtonProps = {
  tableRef: any;
  children: any;
};

const ExportExcelButton: React.FC<ExportExcelButtonProps> = ({ tableRef, children }) => {
  return (
    <DownloadTableExcel
      filename="data table"
      sheet="data"
      currentTableRef={tableRef}
    >
      {children}
    </DownloadTableExcel>
  );
};

export default ExportExcelButton;
=======
import React from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

type ExportExcelButtonProps = {
  tableRef: any;
  children: any;
};

const ExportExcelButton: React.FC<ExportExcelButtonProps> = ({ tableRef, children }) => {
  return (
    <DownloadTableExcel
      filename="data table"
      sheet="data"
      currentTableRef={tableRef}
    >
      {children}
    </DownloadTableExcel>
  );
};

export default ExportExcelButton;
>>>>>>> Stashed changes
