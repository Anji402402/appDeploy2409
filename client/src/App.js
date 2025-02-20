import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Leaves from "./components/Leaves";
import Tasks from "./components/Tasks";
import EditProfile from "./components/EditProfile";
function App() {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path= "/tasks"element={<Tasks/>}></Route>
      <Route path ="/leaves" element={<Leaves/>}></Route>
      <Route path ="/editProfile" element ={<EditProfile/>}></Route>
      <Route path ="/dashboard" element ={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App;
