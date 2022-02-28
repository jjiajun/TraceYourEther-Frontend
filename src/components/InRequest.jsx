import React ,{useContext, useEffect,useState} from "react";
import { approveRequest, rejectRequest } from "../solidityMethods";
import axios from "axios";
import { refreshContext } from "../context";
import { useNavigate } from 'react-router-dom';
const {REACT_APP_BACKEND} = process.env

export default function InRequest({oneRequest, allRequest, setter}){
  const [requester, setRequester] = useState('');
  const refresh = useContext(refreshContext)
  const navigate = useNavigate();
  
  
  useEffect(() => {
    axios.post(`${REACT_APP_BACKEND}/getuserprofilebywallet`,{address:oneRequest.payeeAddress.toString()}).then((response)=>{
      setRequester(response.data.userProfile.name)
    })
      
    },[]) 

  if(!oneRequest) return <div />;
  console.log('one',oneRequest)
  console.log('all',allRequest)
  console.log('setter', setter )

  const approveThisRequest =() =>{
    console.log('Approve')
    console.log('req id',oneRequest.id )
    approveRequest(oneRequest.id).then((response)=>{
      setTimeout(()=>{refresh.setter(!refresh.state)},15000)
    })
    
    

  }
  
  const rejectThisRequest =() =>{
    console.log('Reject')
    rejectRequest(oneRequest.id).then((response)=>{
      console.log('rejectedddddd')
      setTimeout(()=>{refresh.setter(!refresh.state)},15000)
    })
  }

  

  return (
    <div>
      <div className="incomingReq">
        <div className="requestDetails">
          <h4>{requester}</h4>
          <h5>{oneRequest.amount}</h5>
          <p>{oneRequest.description}</p>
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