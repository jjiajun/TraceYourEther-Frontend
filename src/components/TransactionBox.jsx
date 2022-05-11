import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context";

const { REACT_APP_BACKEND } = process.env;

export default function TransactionBox(transactions) {
  const [idToName, setIdToName] = useState(null);
  const [profileData, setProfileData] = useState();

  const token = localStorage.getItem("sessionToken");
  // create authorization header
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios.get(`${REACT_APP_BACKEND}/getallusersdata`, auth).then((response) => {
      const userMapping = {};
      response.data.allUserData.forEach((user, index) => {
        userMapping[`${user.address.toLowerCase()}`] = user.name;
      });
      setIdToName(userMapping);
    });
  }, []);

  const id = useContext(userContext);
  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND}/getuserprofilebyid`, { id }, auth)
      .then((response) => {
        setProfileData(response.data.userProfile.address);
      });
  }, []);

  if (!transactions.transactions) return <div />;
  if (!transactions.transactions[0]) {
    return (
      <div>
        <h4 className="text-gray-400">No transactions currently</h4>
      </div>
    );
  }

  const transactionList = transactions.transactions.map(
    (transaction, index) => (
      <tr className="bg-background h-12 border-white border-8 ">
        <td className="name-cell rounded-l-3xl">
          {idToName[transaction.payeeAddress.toLowerCase()]}
        </td>
        <td className="name-cell">
          {idToName[transaction.payerAddress.toLowerCase()]}
        </td>
        <td className="name-cell">{transaction.timestamp}</td>
        <td className="name-cell">{transaction.description}</td>
        <td className="name-cell rounded-r-3xl">
          {transaction.payerAddress === profileData
            ? `-${transaction.amount}`
            : `+${transaction.amount}`}
        </td>
      </tr>
    )
  );

  return (
    <div className="flex justify-center my-2 bg-white text-gray-900 w-full px-10">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="w-1/8 font-semibold text-gray-400">Payee</th>
            <th className="w-1/8 font-semibold text-gray-400">Payer</th>
            <th className="w-1/4 font-semibold text-gray-400">Timestamp</th>
            <th className="w-1/4 font-semibold text-gray-400">Description</th>
            <th className="w-1/4 font-semibold text-gray-400">Amt</th>
          </tr>
        </thead>
        <tbody>{idToName && transactionList}</tbody>
      </table>
    </div>
  );
}
