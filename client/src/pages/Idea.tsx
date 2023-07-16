import React, {useState, useEffect, FormEvent} from 'react'
import Navbar from '../components/Navbar';
import { Link, useParams } from 'react-router-dom'
import {BarLoader} from 'react-spinners'
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import copy from 'clipboard-copy';
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function BlogPost() {
    const navigate = useNavigate()
    const URL = "http://localhost:5000"
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
         setLoading(true)
        fetch(`${URL}/ideas/${id}`,{
            headers: {
                "x-access-token": localStorage.getItem("token") || "",
            },
        }).then(res => res.json()).then(data => {
            setTitle(data.data.title)
            setDescription(data.data.description)
            setCreatedBy(data.data.createdBy)
             setLoading(false)
        }).
        catch(err => console.log(err))
    },[])


  return (
    <> 
    { loading? (<div className='loader'><BarLoader color='#0d6efd' loading={loading} /></div>): (
        <>
        <Navbar/>
        <div className='blog-view'>
            <div className='blog-details'>
            <div className='creator' style={{color:"black"}}>Author: {createdBy}</div>
            
            {/* {isFollowing? <button style={{background: "grey"}} onClick={unfollowAuthor}>Unfollow</button>: <button onClick={followAuthor}>Follow</button>} */}
            <Link to={'/chat'}><button style={{background:"darkorange"}}>Interested</button></Link>
        </div>
            <div className='title'>{title}</div>
            <hr/><br/>
            <div className='desc'>{description}</div>
        </div>
        {/* <ToastContainer/> */}
        </>
         )} 
    </>
  )
}
