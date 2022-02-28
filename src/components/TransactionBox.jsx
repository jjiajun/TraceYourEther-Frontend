import axios from "axios";
import React,{useContext, useEffect, useState} from "react";


const {REACT_APP_BACKEND} = process.env


export default function TransactionBox(transactions) {
  const [idToName,setIdToName] = useState(null)
  const [payeeName, setPayeeName] = useState('')
  const [payerName , setPayerName]  = useState('')
  useEffect(()=>{
    axios.get(`${REACT_APP_BACKEND}/getallusersdata`).then((response)=>{
      console.log(response.data.allUserData)
      const userMapping = {}
      response.data.allUserData.forEach((user,index)=>{
        userMapping[`${user.address.toLowerCase()}`] = user.name
      })
      console.log(userMapping)
      setIdToName(userMapping)
     
    })
  },[])
  
  console.log('trans',transactions)
  if(!transactions.transactions) return <div />;
  if(!transactions.transactions[0]) {
    return(
      <div>
        <h2>No transactions currently</h2>
      </div>
    )
  }

  const transactionList = transactions.transactions.map((transaction,index)=>(
    <tr>
      <td>{idToName[transaction.payeeAddress.toLowerCase()]}</td>
      <td>{idToName[transaction.payerAddress.toLowerCase()]}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.timestamp}</td>
      <td>{transaction.description}</td>
    </tr>
  ))

  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Requester</th>
            <th>Payer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {idToName && transactionList}
        </tbody>
      </table>
    </div>
  )
}