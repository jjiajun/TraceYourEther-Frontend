import React ,{useEffect,useState} from "react";
import { approveRequest } from "../solidityMethods";
import axios from "axios";
const {REACT_APP_BACKEND} = process.env

export default function InRequest(oneRequest){
  const [requester, setRequester] = useState('');

 
  useEffect(() => {
    axios.post(`${REACT_APP_BACKEND}/getuserprofilebywallet`,{address:oneRequest.oneRequest.payeeAddress.toString()}).then((response)=>{
      setRequester(response.data.userProfile.name)
    })
      
    },[]) 

  if(!oneRequest.oneRequest) return <div />;
  console.log('one',oneRequest)
  const approveThisRequest =() =>{
    console.log('Approve')
    console.log('req id',oneRequest.oneRequest.id )
    approveRequest(oneRequest.oneRequest.id)

  }
  
  const rejectThisRequest =() =>{
    console.log('Reject')
  }

  

  return (
    <div>
      <div className="incomingReq">
        <div className="requestDetails">
          <h4>{requester}</h4>
          <h5>{oneRequest.oneRequest.amount}</h5>
          <p>{oneRequest.oneRequest.description}</p>
        </div>
        <div>
          <button className="btn approve-btn" type="submit" onClick={approveThisRequest} >
            Approve
          </button>
          <button className="btn reject-btn" type="submit" onClick={rejectThisRequest} >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}