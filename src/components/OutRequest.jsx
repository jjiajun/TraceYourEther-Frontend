import React ,{useEffect,useState} from "react";
import { approveRequest } from "../solidityMethods";
import axios from "axios";
const {REACT_APP_BACKEND} = process.env

export default function OutRequest(oneRequest){
  const [requester, setRequester] = useState('');

 
  useEffect(() => {
    axios.post(`${REACT_APP_BACKEND}/getuserprofilebywallet`,{address:oneRequest.oneRequest.payeeAddress.toString()}).then((response)=>{
      setRequester(response.data.userProfile.name)
    })
      
    },[]) 

  if(!oneRequest.oneRequest) return <div />;
  console.log('one',oneRequest)
  

  

  return (
    <div>
      <div className="outgoingReq">
        <div className="requestDetails">
          <h4>{requester}</h4>
          <h5>{oneRequest.oneRequest.amount}</h5>
          <p>{oneRequest.oneRequest.description}</p>
        </div>
        
      </div>
    </div>
  )
}