import React, {useState, useEffect, FormEvent} from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom"
 import jwtDecode from "jwt-decode"
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
// import BlogPosts from './AllPosts';
// import { Comment } from './BlogPost';
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
    const navigate = useNavigate()
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false)
   const URL = "http://localhost:5000"
  
  // useEffect(()=>{
  //   fetchBlogPosts();
  // },[blogPosts])
    
  async function populate(): Promise<void>{
    setLoading(true)
      const req = await fetch(URL+'/api/home', {
       headers: {
        "x-access-token": localStorage.getItem("token") || "", 
       },
      })
      const data = await req.json()
      if(data.status==='ok'){
          setUsername(data.username)
           setEmail(data.email)
      }
      setLoading(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const user = jwtDecode(token)
      if(!user){
      // console.log(user)
        localStorage.removeItem('token')
        navigate("/login", {replace: true})
      }else{
        populate()
      }
    }else{
      navigate("/login", {replace: true})
    }
  }, []);

    const showNotification = () => {
      Notification.requestPermission().then(permission => {
        if(permission === 'granted'){
          new Notification("Idea Posted!",
            {
              body: `New Idea is Created by ${email}`,
              icon: 'https://img.icons8.com/color/48/idea.png'
            }
          )
        }
      })
    }

    const handleSubmit = async (e: FormEvent): Promise<void> => {
      e.preventDefault()
      setLoading(true)
      const req = await fetch(`${URL}/api/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      })
      const data = await req.json()
      console.log(data)
      setTitle("");
      setDescription("");
      showNotification()
      setLoading(false)
    //   toast.success("Post Created Successfully")
    };

  return (
    <>
        <Navbar/>
        {loading ? (<div className='loader'><BarLoader color='#0d6efd' loading={loading} /></div>): (
         <center>
        <div className="container">
          <h1 className='head' style={{fontSize:"45px"}}>Welcome, {username}!</h1>
          <h3 className='head'>Describe your idea here...</h3>
        <form className='form-form'>
          
          <div className='box'>
            <h2>Title</h2>
            <input type="text" className="idea-title input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter your Idea title" />
          <h2>Description</h2>
          <textarea required className='idea-title input'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
             
            }}
            placeholder="Describe your idea here..."
          ></textarea>
          <br />
          <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
          </div>
        </form>
      </div>
      </center>
        )}
        {/* <ToastContainer/> */}
    </>
  )
}
