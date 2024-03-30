import { useState } from 'react'
import './App.css'
import * as XLSX from 'xlsx'
import { Transaction } from './Transaction'

function App() {
  const [category, setCategory] = useState({ food: 0, travel: 0, creditCardBill: 0, investment: 0, misc: 0, refreshments: 0 })


  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    const reader: FileReader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (e) => {
      const binaryStr: any = e.target?.result
      const wb: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' })
      const wsName: string = wb.SheetNames[0]
      const ws: XLSX.WorkSheet = wb.Sheets[wsName]
      const transactions: Transaction[] = XLSX.utils.sheet_to_json(ws)
      parseData(transactions)
    }
  }

  const parseData = (transactions: Transaction[]) => {
    transactions.forEach((transaction) => {
      if (transaction.withdrawals) {
        let particulars: string = transaction.particulars

        if (particulars.includes('Zomato') || particulars.includes('SWIGGY')) {
          category.food += parseInt(transaction.withdrawals.replace(',', ''))
          setCategory(category)
        }
        else if (particulars.includes('OLACABS')) {
          category.travel += parseInt(transaction.withdrawals.replace(',', ''))
          setCategory(category)
        }
        else if (particulars.includes('CRED')) {
          category.creditCardBill += parseInt(transaction.withdrawals.replace(',', ''))
          setCategory(category)
        }
        else if (particulars.includes('GROWW')) {
          category.investment += parseInt(transaction.withdrawals.replace(',', ''))
          setCategory(category)
        }
        else if (particulars.includes('zepto')) {
          category.refreshments += parseInt(transaction.withdrawals.replace(',', ''))
        }
        else {
          category.misc += parseInt(transaction.withdrawals.replace(',', ''))
        }
      }
    })
    console.log(category)
  }

  return (
    <>
      <input type="file" accept=".xls" onChange={(e) => handleFileUpload(e)} />

      <h1>Here's what you've spent:</h1>

    </>
  )
}

export default App