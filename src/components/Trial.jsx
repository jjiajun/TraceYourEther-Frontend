import React , {useContext} from "react";
import { userContext } from "../context";

export default function Trial() {
  const user = useContext(userContext);
  return(
    <div>
      <h1>{`${user}`}</h1>
    </div>
  )
}