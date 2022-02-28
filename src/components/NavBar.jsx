import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { GiTakeMyMoney, GiReceiveMoney } from "react-icons/gi";
import { BsCashStack } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

export default function NavBar() {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-screen h-24 m-0 bg-white text-black shadow-lg px-20 flex flex-col justify-center">
        <nav className="flex justify-between ">
          <Link to="/" className="navbar-icon">
            {<BiHomeAlt size="40" />} Dashboard
          </Link>
          <Link to="/requests" className="navbar-icon">
            {<GiReceiveMoney size="40" />} Requests
          </Link>
          <Link to="/Transactions" className="navbar-icon">
            {<BsCashStack size="40" />} Transactions
          </Link>
          <Link to="/addfriend" className="navbar-icon">
            {<FaUserFriends size="40" />} Friends
          </Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
