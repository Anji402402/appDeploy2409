import React, { useEffect, useRef,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";


function Signup() {

     useEffect(()=>{
          axios.defaults.baseURL="";

     },[])

     let firstNameInputRef =useRef();
     let lastNameInputRef =useRef();
     let ageInputRef =useRef();
     let emailInputRef =useRef();
     let passwordInputRef = useRef();
     let mobileNoInputRef =useRef();
     let profilePiCInputRef =useRef();

     let [profilePiC,setprofilePic] = useState("./images/no-pic3.png")

  //Using JSON -POST
  let onSignupUsingJSON = async ()=>{
          let dataToSendJSO = {
               firstName:firstNameInputRef.current.value,
               lastName:lastNameInputRef.current.value,
               age:ageInputRef.current.value,
               email:emailInputRef.current.value,
               password:passwordInputRef.current.value,
               mobileNo:mobileNoInputRef.current.value,
               profilePiC:passwordInputRef.current.value,
          };
          
          let dataToSendJSON = JSON.stringify(dataToSendJSO);
          console.log(dataToSendJSO);
          console.log(dataToSendJSON);

     
    };    
        //USING FORMDATA
     let onSignupUsingFormData = async ()=>{

     let dataTOSend = new FormData();
     dataTOSend.append("firstName",firstNameInputRef.current.value);
     dataTOSend.append("lastName",lastNameInputRef.current.value);
     dataTOSend.append("age",ageInputRef.current.value);
     dataTOSend.append("email",emailInputRef.current.value);
     dataTOSend.append("password",passwordInputRef.current.value);
     dataTOSend.append("mobileNo",mobileNoInputRef.current.value);

     for(let i=0; i< profilePiCInputRef.current.files.length; 
     i++){
          dataTOSend.append("profilePic",profilePiCInputRef.current.files[i]);
     }

     // let reqOptions = {
     //      method:"POST",
     //      body:dataTOSend,
     // };

     let JSONData = await axios.post("/signup",
     dataTOSend);
    
//     let JSOData = await JSONData.json();
     console.log(JSONData.msg)
    alert(JSONData.msg);
};
      //USING URLE ENCODE
let onSignupUsingURLE = async ()=>{

     let dataTOSend = new URLSearchParams();
     dataTOSend.append("firstName",firstNameInputRef.current.value);
     dataTOSend.append("lastName",lastNameInputRef.current.value);
     dataTOSend.append("age",ageInputRef.current.value);
     dataTOSend.append("email",emailInputRef.current.value);
     dataTOSend.append("password",passwordInputRef.current.value);
     dataTOSend.append("mobileNo",mobileNoInputRef.current.value);

     


     let myHeaders =new Headers();
     
     myHeaders.append("content-type", "application/x-www-form-urlencoded"); //browser to collecting url
     // let reqOptions = {
     //      method:"POST",
     //      body:dataTOSend,
     //      headers:myHeaders,
     // };

     let JSONData = await axios.post ("/singnup",dataTOSend);
    
//     let JSOData = await JSONData.json();

    console.log(JSONData.msg);
};

return (
    <div className="App">
    <form>
        <h3>Signup</h3>
        <div>
             <label>firstName</label>
             <input ref={firstNameInputRef} type='text'></input>
        </div>

        <div>
             <label>lastName</label>
             <input ref={lastNameInputRef} type='text'></input>
        </div>

        <div>
             <label>Age</label>
             <input ref={ageInputRef} type='number'></input>
        </div>

        <div>
             <label>Email</label>
             <input ref={emailInputRef} type='email'></input>
        </div>

        <div>
             <label>Password</label>
             <input ref={passwordInputRef} type='password'></input>
        </div>
        <div>
             <label>Mobile No</label>
             <input ref={mobileNoInputRef} type='number'></input>
        </div>
        <div>
             <label>Profile Pic</label>
             <input ref={profilePiCInputRef} type='file'
             //multiple(or)single

              onChange={(event)=>{
                  let selectPicPath = URL.createObjectURL(event.target.files[0]);
                  setprofilePic(selectPicPath);
             }}></input>
        </div>
        <div>
             <img  className="profilePicPreview" src={profilePiC} alt=''></img>
        </div>

        <div>
             {/*<button type='button' onClick={()=>{
                  onSignupUsingJSON();

             }}>Signup(JSON)</button>
             <button type="button" onClick={()=>{
                  onSignupUsingURLE();

        
             }}>Signup(URLE)</button>*/}
             <button type='button' onClick={()=>{
                  onSignupUsingFormData();
             }}>Signup</button>
        </div>
    </form>
    <Link to="/">Login</Link>
</div>
)};

export default Signup;
