import React, { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";

function Login() {
     let navigate = useNavigate();
     let emailInputRef =useRef();
     let passwordInputRef = useRef();
     let dispatch = useDispatch();
     
     useEffect(()=>{
          if(localStorage.getItem("token")){
               onValidateToken();
               // emailInputRef.current.value = localStorage.getItem("email");
               // passwordInputRef.current.value = localStorage.getItem("password");
          }
     },[]);
     
     let onValidateToken = async ()=>{

          let dataTOSend = new FormData();
          dataTOSend.append("token",localStorage.getItem("token"));

          
     let reqOptions = {
          method:"POST",
          body:dataTOSend,
          
     };

     let JSONData = await axios.post("/validateToken",dataTOSend);
    
    //let JSOData = await JSONData.json();
    console.log(JSONData.data);

    if(JSONData.data.status == "success"){

     //localStorage.setItem("token",JSOData.data.token)
     // localStorage.setItem("email",emailInputRef.current.value);
     // localStorage.setItem("password",passwordInputRef.current.value);
     dispatch({type: "login",data:JSONData.data.data});
     navigate("/dashboard");
     }
}

let onLogin = async ()=>{
     let dataTOSend = new FormData(); //URLSearchParams()


     dataTOSend.append("email",emailInputRef.current.value);
     dataTOSend.append("password",passwordInputRef.current.value);
     


     // let reqOptions = {
     //      method:"POST",
     //      body:dataTOSend,
          
     // };

    let JSONData = await axios.post("/login", dataTOSend);
    //let JSOData = await JSONData.json();
    console.log(JSONData.data);

    if(JSONData.data.status == "success"){

     localStorage.setItem("token",JSONData.data.token)
     // localStorage.setItem("email",emailInputRef.current.value);
     // localStorage.setItem("password",passwordInputRef.current.value);
     dispatch({type: "login",data:JSONData.data.data});
     navigate("/dashboard");
     alert(JSONData.data.msg)
     }
 };
  return (
    <div className="App">
    <form>
        <h3>Login</h3>
        <div>
             <label>Email</label>
             <input ref={emailInputRef}></input>
        </div>

        <div>
             <label>Password</label>
             <input ref={passwordInputRef}></input>
        </div>
        <div>
        <button type="button" onClick={()=>{
                  onLogin();
             }}>Login</button>
        </div>
    </form>
    <br></br>
    <br></br>
    <Link to="/signup">Signup</Link>
 </div>
   )
};

export default Login;