import React from "react";
import TransactionBox from "./TransactionBox";

export default function DashTransactions() {
  return (
    <div className="flex flex-col h-1/4 w-screen bg-gradient-to-b from-white to-background py-5 px-5 text-gray-900">
      <h1>Dash Transactions</h1>
      <TransactionBox />
    </div>
  );
}
