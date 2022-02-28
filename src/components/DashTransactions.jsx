import React, { useState, useEffect, useContext } from "react";
import TransactionBox from "./TransactionBox";
import {
  getAllRequestsForPayee,
  getAllRequestsForPayer,
} from "../solidityMethods";
import { refreshContext } from "../context";

export default function DashTransactions() {
  const [transactionList, setTransactionList] = useState("");
  const refresh = useContext(refreshContext);
  useEffect(() => {
    getAllRequestsForPayer().then((response) => {
      console.log("test", response);
      const existingReqPayer = response.filter(
        (request) => request.completed === true && request.approved === 1
      );
      getAllRequestsForPayee().then((responsePayee) => {
        const existingReqPayee = responsePayee.filter(
          (request) => request.completed === true && request.approved === 1
        );
        let holding = [...existingReqPayee, ...existingReqPayer];
        holding.sort(function (a, b) {
          return Number(b.noOfSecSinceEpoch) - Number(a.noOfSecSinceEpoch);
        });
        const fiveTransac = [];
        for (let i = 0; i < holding.length; i += 1) {
          if (i > 4) break;
          fiveTransac.push(holding[i]);
        }
        setTransactionList(fiveTransac);
        console.log(transactionList);
      });
    });
  }, [refresh.state]);
  return (
    <div className="flex flex-col h-1/4 w-screen bg-gradient-to-b from-white to-background py-5 px-5 text-gray-900">
      <h1>Dash Transactions</h1>
      <TransactionBox transactions={transactionList} />
    </div>
  );
}
