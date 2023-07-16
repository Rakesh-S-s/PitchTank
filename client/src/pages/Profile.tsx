import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { BarLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const navigate = useNavigate()
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState('')
    const URL = "http://localhost:5000"
    useEffect(() => {
        fetchUser();
    },[])
    const fetchUser = async () => {
        setLoading(true)
        try{
        const req = await fetch(URL+'/api/user/profile', {
            headers: {
                "x-access-token": localStorage.getItem("token") || "",
            }
        })
        const dat = await req.json()
        // console.log(dat)
        setUserName(dat.data.username)
        setEmail(dat.data.email)   
        setRole(dat.data.category)
    }catch(err){
        navigate('/home', {replace: true})
    }
    setLoading(false)
    }
  return (
    <>
        <Navbar/>
        <center>
                <h1 className='head'>Profile</h1>
            </center>
        { loading? (<div className='loader'><BarLoader color='#0d6efd' loading={loading} /></div>): (
            <center>
        <div className='profile'>
        <h2>Name: </h2><p>{username}</p>
        <h2>Email: </h2><p>{email}</p>
        <h2>Role: </h2><p>{role}</p>
        </div>
        </center>
        )}
    </>
  )
}
