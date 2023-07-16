import React, {useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { BarLoader } from 'react-spinners';
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
interface Idea{
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export default function Ideas() {
  const [ideaPosts, setIdeaPosts] = useState<Idea[]>([]);
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const URL = "http://localhost:5000"
  useEffect(()=>{
    fetchIdeaPosts();
  },[])
  const fetchIdeaPosts = async () => {
    setLoading(true)
    const req = await fetch(URL+'/myideas', {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
  })
  const data = await req.json()
  setIdeaPosts(data.data)
  setEmail(data.email)
  setLoading(false)
}

const deleteBlog = async (id: string) => {
  const result = window.confirm("Are you sure want to delete this Idea post?")
  if(result){
  setLoading(true)
  const req = await fetch(URL + "/idea/delete/"+id, {method: "DELETE"})
  const data = await req.json();
  setIdeaPosts(ideaPosts => ideaPosts.filter(post=> post._id !== data._id))
  setLoading(false)
  }
//   toast.success("Blog Deleted Successfully")
}


  return (
   <>
   <Navbar/>
   {loading ? (<div className='loader'><BarLoader color='#0d6efd' loading={loading} /></div>):(
     <div className="container">
            <center>
                <h1 className='head'>My Ideas</h1>
            </center>
            <div className='card-container'>
          {ideaPosts.map(ideaPost => (
              <div className='card' key={ideaPost._id}>
                <div className='creator'>Idea  : {ideaPost.createdBy}</div>
                {ideaPost.createdBy === email && <button className='delete' onClick={()=>deleteBlog(ideaPost._id)}>Delete</button>}
                <div className='title'>{ideaPost.title}</div>
                <div className='contents'>{ideaPost.description}</div>
                <Link to={`/ideas/${ideaPost._id}`} className='read-more button'>Read more</Link>
                { ideaPost.createdBy === email && <Link to={`/idea/edit/${ideaPost._id}`} className='edit'>Edit</Link>}
                {/* <button className='like' onClick={()=> incrementLikes(blogPost._id)}>{blogPost.likes.length} {blogPost.likes.length <= 1? "Like": "Likes"}</button> */}
            </div>
          ))}
        </div>
        </div>
   )}
   {/* <ToastContainer/> */}
   </>
  )
}
