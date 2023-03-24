import React, { FC, useState } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { LayoutProps } from './layout'

const Actions: FC<LayoutProps> = (props) => {
    const [showAction, setShowAction] = useState(false)
  return (
    <div className='relative right-10'>
        <button onClick={() => setShowAction(!showAction)} className='px-4 bottom-2 rounded-lg border-blue-500 font-bold border'>Actions</button>
        {showAction && <div className="fixed bg-white shadow-lg p-4">
        <DownloadTableExcel
        filename="Monthly data table"
        sheet="data"
        currentTableRef={props.monthtableRef.current}
      >
        <button className='border rounded-lg px-3 font-bold text-xs hover:bg-slate-200'> Download xls </button>
      </DownloadTableExcel>
        </div>}
    </div>
  )
}

export default Actions