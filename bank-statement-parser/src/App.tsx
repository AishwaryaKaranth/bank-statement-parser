import { useState } from 'react'
import './App.css'
import * as XLSX from 'xlsx'

function App() {
  const [file, setFile] = useState(0)

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    const reader: FileReader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (e) => {
      const binaryStr: any = e.target?.result
      const wb: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' })
      const wsName: string = wb.SheetNames[0]
      const ws: XLSX.WorkSheet = wb.Sheets[wsName]
      const transactions: any[] = XLSX.utils.sheet_to_json(ws)
      console.log(transactions)
    }
  }

  return (
    <>
      <input type="file" accept=".xls" onChange={(e) => handleFileUpload(e)} />
    </>
  )
}

export default App
