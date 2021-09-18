import React from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { Icon } from '@iconify/react'
import downloadFill from '@iconify/icons-eva/download-fill'
import Button from '@material-ui/core/Button'

export const ExportToExcel = ({ apiData, fileName, disabled }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      endIcon={<Icon icon={downloadFill} />}
      style={{ marginRight: 30 }}
      onClick={(e) => exportToCSV(apiData, fileName)}
      disabled={disabled}
    >
      Export
    </Button>
  )
}
