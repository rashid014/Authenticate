import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/loginComponent'
import Signup from './Components/signupComponet'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const[accessToken,setAccessToken]=useState("")
  useEffect(
    ()=>{
      const token=Cookies.get("jwtsecret")
      console.log(token,"TOKEN######");
      setAccessToken(token)
    }
  )

  
  return (
    
       <Router>
    <Routes>
    <Route exact path="/"  element={<Login/>}/>
    <Route  path="/signup"  element={<Signup/>}/>
    </Routes>
   </Router>
 
  
  )
}

export default App