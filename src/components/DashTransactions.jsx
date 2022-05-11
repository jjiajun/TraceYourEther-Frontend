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
      });
    });
  }, [refresh.state]);
  return (
    <div className="flex flex-col w-screen bg-white py-3 px-5 text-gray-900 flex-grow overflow-auto mb-20">
      <h3 className="font-bold mb-3">Latest Transactions</h3>
      <TransactionBox transactions={transactionList} />
    </div>
  );
}
