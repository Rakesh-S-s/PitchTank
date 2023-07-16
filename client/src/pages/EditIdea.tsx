import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {BarLoader} from 'react-spinners'

export default function EditBlog() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const[loading, setLoading] = useState(false)
    const URL = "http://localhost:5000"

   useEffect(()=>{
        fetch(`${URL}/ideas/${id}`).then(res => res.json()).then(data => { 
            setTitle(data.data.title);
            setDescription(data.data.description);});
   },[])

    const getDetails = async () => {
        const req = await fetch(`${URL}/ideas/${id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token") || "",
          },
        })
        const data = await req.json()
        if(data.status === 'ok'){
          setTitle(data.data.title)
          setDescription(data.data.description)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const req = await fetch(`${URL}/api/idea/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token") || "",
          },
          body: JSON.stringify({
            title: title,
            description: description
          })
        })
        const data = await req.json();
        setLoading(false)
        if(data.status === 'ok'){
        //   toast.success("Blog updated successfully")
          navigate(`/ideas/${id}`, {replace: true})
        }
        setLoading(false)
    }

    const showNotification = () => {
      Notification.requestPermission().then(permission => {
        if(permission === 'granted'){
          new Notification("Post Updated!",
            {
              body: `Post is Updated Successfully`,
              icon: 'https://img.icons8.com/?size=512&id=79058&format=png'
            }
          )
        }
      })
    }

  return (
    <>
    <Navbar/>
    {loading ? (<div className='loader'><BarLoader color='#0d6efd' loading={loading} /></div>):(
      <>
    <center><h1 style={{margin: "15px 0 0 0"}}>Edit Blog</h1></center>
    <div className=''>
        
      <form onSubmit={(e) => handleSubmit(e)} className='form-form'>
      <div className='box'>
      <h2>Title</h2>
        <input type="text" className="idea-title input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter your blog title" />
        <h2>Description</h2>
          <textarea 
          className='idea-title input'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          ></textarea>
          <center>
            <br/>
          <button type="submit">UPDATE</button>
          </center>
          </div>
          
          </form>
          {/* <ToastContainer/> */}
          </div>
          </>
    )} 
      </>
  )
}
