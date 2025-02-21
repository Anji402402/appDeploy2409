import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function TopNavigation() {
     let navigate = useNavigate();
     let userDetails = useSelector((store)=>{
          console.log("TopNavigation");
          console.log(store);
          return store.userDetails;
     });

     useEffect(()=>{
          if(userDetails && userDetails.email){

          }else{
               navigate("/");

          }
     });
  return (
    <div>
     <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tasks">Tas</Link>
          <Link to ="/leaves">Leaves</Link>
          <Link to ="/editProfile">Edit Profile</Link>
          <Link to ="/" onClick={()=>{
               localStorage.clear();
          }}>Signout</Link>
     </nav>
      
    </div>
  )
}

export default TopNavigation;
