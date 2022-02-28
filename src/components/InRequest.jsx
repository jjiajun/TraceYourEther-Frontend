import React ,{useContext, useEffect,useState} from "react";
import { approveRequest, rejectRequest } from "../solidityMethods";
import axios from "axios";
import { setRequestContext } from "../context";
import { getAllRequestsForPayer } from "../solidityMethods";
const {REACT_APP_BACKEND} = process.env

export default function InRequest({oneRequest, allRequest, setter}){
  const [requester, setRequester] = useState('');
  const reqSetter = useContext(setRequestContext)
  
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
      
      setter([...allRequest].map((req)=>{
        if(req.id === oneRequest.id){
          console.log('found')
          return { ...req, completed: true }
 
        }
        return req
      }))
    })
    
    

  }
  
  const rejectThisRequest =() =>{
    console.log('Reject')
    rejectRequest(oneRequest.id)
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