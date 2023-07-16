import React, { FormEvent, useState } from 'react'
import './Form.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {BarLoader} from 'react-spinners'

export default function Login() {
  const URL = "http://localhost:5000"
    const navigate = useNavigate();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const data = await fetch(URL+"/api/login", {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            email: email,
            password: password
            })
          
        })
        const req = await data.json();
        setLoading(false)
        if(req.user){
            localStorage.setItem('token',req.user)
            navigate("/home", {replace: true})
        }else{
           //toast.error('Email or Password is incorrect')
           alert("Email or Password is incorrect")
        }
        // console.log(req)
    }
  return (
    <>
     {loading ? (<div className='loader'><BarLoader color='#0d6efd' loading={loading} /></div>):(

    <div className='log-cont'>
        <form onSubmit={handleSubmit} className='car'>
        <center><h1>Login</h1></center>
            <input type='text' className="input" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/><br/>
            <input type='password' className='input' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/><br/>
            <center><button type='submit'>Login</button></center>
            <h3>Don't have an Account yet? <Link to={"/register"}>Register</Link></h3>
        </form>
       
        {/* <ToastContainer/> */}
    </div>
    )}
    </>
  )
}
