import React, {useRef, useState, useEffect} from 'react'
import {BeatLoader} from 'react-spinners'
import Navbar from '../components/Navbar';
import './Chat.css'
interface Message {
    _id: string;
    message: string;
    sender: string;
}

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [length, setLength] = useState<number>(0);
    const chatSectionRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState<string>("")

    const URL = "http://localhost:5000"

    useEffect(() => {
     fetchMessage();
    },[])

    useEffect(()=>{
        const interval = setInterval(()=>{
            fetchMessage();
        }, 500);
        return () => clearInterval(interval);
    },[])

    useEffect(() => {
        if (chatSectionRef.current) {
          chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
        }
      },[length]);

    const fetchMessage = async() => {
        try{
            const response = await fetch(URL + "/message",{
                headers: {
                    "x-access-token": localStorage.getItem("token") || ""
                }
            });
            const result = await response.json(); 
            if(result.user){
                setMessages(result.data);
                setEmail(result.email)
                setLength(result.data.length);
            }else{
                
            }
        }catch(err){
            window.location.href = "/login"
        }
    }

    const sendMessage = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            setLoading(true)
            const response = await fetch( URL + "/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token") || ""
                },
                body: JSON.stringify({message})
            });
            setMessage("");
            const result = await response.json();
            setLoading(false)
            fetchMessage();          
        }catch(err){
            console.log(err)
        }
    };


  return (
    <>
    <Navbar/>
    <div className='container-chat'>
        <div className='chat-section' ref={chatSectionRef}>
            <div className='chat-bar'>{
                messages.map(msg => {
                    if(msg.sender === email)
                    {
                        return (
                            <div className='msg-bar r'>
                               <div className='msg' key={msg._id}><div style={{fontSize: "14px", color:"#CCCCCC"}}>{msg.sender}</div>{msg.message}</div>
                           </div>
                            )
                    }
                    else
                    {
                        return (
                            <div className='msg-bar s'>
                               <div className='msg' key={msg._id}><div style={{fontSize: "14px", color: "#CCC"}}>{msg.sender}</div>{msg.message}</div>
                           </div>
                            )
                    }
                })}
            </div>
        </div>
        <div className='msg-section'>
            <form method="POST" style={{display:'flex', alignItems:'center'}} onSubmit={sendMessage}>
                <input className='msg-box'  placeholder="Message..." type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button className="button btn" type="submit">{loading? <BeatLoader color='#FFF' size={6}/>:"Send"}</button>
            </form>      
        </div>
    </div>
    </>
  )
}
