import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Form.css'
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import 'react-toastify/dist/ReactToastify.css';
import {BarLoader} from 'react-spinners'

export default function Register() {
    const URL = "http://localhost:5000"
    const navigate = useNavigate();
    const[username, setUserName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const [selectedOption, setSelectedOption] = useState("")
    const[loading, setLoading] = useState(false)

    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);
    }
   async function handleSubmit(e: FormEvent){
        e.preventDefault()
        setLoading(true)
        const data = await fetch(URL+"/api/register",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password, 
                category: selectedOption
            })
        })
        const res = await data.json();
        setLoading(false)
        if(res.status === 'ok'){
            // toast.success("Account created successfully")
            navigate("/login")
        }else{ 
            // toast.warning("Email already exists")
        }
        // console.log(res)
    }

  return (
    <>
    {loading? (<div className='loader'><BarLoader color='#0d6efd' loading={loading} /></div>):(
    <div className='log-cont'>
        
        <form onSubmit={handleSubmit} className='car'>
        <center><h1  style={{fontSize:"40px"}}>Register</h1></center><br/>
            <input type='text' className='input' placeholder='Username' value={username} onChange={(e)=> setUserName(e.target.value)}/><br/>
            <input type='email' className='input' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/><br/>
            <input type='password' className='input' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/><br/>
        <select id="option" className='input' value={selectedOption} onChange={handleOptionChange}>
            <option value="">Register as</option>
            <option value="mentor">Mentor</option>
            <option value="investor">Investor</option>
            <option value="ideas">Ideas</option>
        </select>
        <br/>
        <br/>
            <center><button type='submit'>Register</button></center>
            <h3>Already have and Account? <Link to={"/login"}>Login</Link></h3> 
        </form>
        
    </div>
    )}
    {/* <ToastContainer/> */}
    </>
  )
}
