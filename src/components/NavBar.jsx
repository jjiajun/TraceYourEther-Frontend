import React from "react";
import {Outlet, Link} from "react-router-dom"

export default function NavBar() {
  return(
    <div>
      <div>
        <span>ZoomZoom</span>
        <nav>
          <Link to='/'>Dashboard</Link>
          <Link to='/requests'>Requests</Link>
          <Link to='/Transactions'>Transactions</Link>
          <Link to='/Profile'>Profile</Link>

        </nav>
      </div>
      <Outlet/>
    </div>
  )
}