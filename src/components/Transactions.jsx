import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionBox from "./TransactionBox";
import {
  getAllRequestsForPayee,
  getAllRequestsForPayer,
} from "../solidityMethods";
import DashBalance from "./DashBalance";
import Profile from "./Profile";

const { REACT_APP_BACKEND } = process.env;

export default function Transactions() {
  const [transactionList, setTransactionList] = useState("");
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
        setTransactionList(holding);
        console.log(transactionList);
      });
    });
  }, []);
  return (
    <div className="bg-primary text-white">
      <Profile />
      <DashBalance />
      <div className="bg-white text-gray-900 py-8 rounded-t-3xl ">
        <TransactionBox transactions={transactionList} />
      </div>
    </div>
  );
}
