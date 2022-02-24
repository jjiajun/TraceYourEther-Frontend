import React from "react";


export default function TransactionBox(transactions) {
  
 
  if(!transactions.transactions) return <div />;
  if(!transactions.transactions[0]) {
    return(
      <div>
        <h2>No transactions currently</h2>
      </div>
    )
  }
  const transactionList = transactions.transactions.map((transaction,index)=>{
    <tr>
      <td>transaction.type</td>
      <td>transaction.party</td>
      <td>transaction.amount</td>
      <td>transaction.date</td>
      <td>transaction.description</td>
    </tr>
  })

  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>To/From</th>
            <th>Requester</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactionList}
        </tbody>
      </table>
    </div>
  )
}