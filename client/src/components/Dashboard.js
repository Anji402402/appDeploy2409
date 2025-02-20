import React from 'react';
import { useSelector } from 'react-redux';
import TopNavigation from './TopNavigation';

function Dashboard() {
     let userDetails = useSelector((store)=>{
          return store.userDetails;
     })

   return (
    <div>
     <TopNavigation/>
      <h1>Dashboard</h1>
      <h2>{userDetails.firstName}
          {userDetails.lastName}
      </h2>
      <img src={`/${userDetails.profilePic}`}></img>
    </div>
  )
 };

export default Dashboard;
