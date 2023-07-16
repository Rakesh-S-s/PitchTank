import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useLocation ,useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [isIdeator, setIsIdeator] = useState(false)
  const [user, setUser] = useState('')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);


  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };


  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate("/login", {replace: true})
  }
  const location = useLocation()

  useEffect(() => {
    checkInv()
  },[])

  const checkInv = async() => {
    const req = await fetch("http://localhost:5000/api/checkidea",{
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
        }
    })
    const data = await req.json()
    setUser(data.user)
    if(data.isIdeator){
      setIsIdeator(true)
    }
    console.log(isIdeator)
  }

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prevState) => !prevState);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    // <nav className={`navbar ${isMobileNavOpen? 'mobile-open': ''}`}>
    //   <h2 className='logo'>ConnectX</h2>
    //     <ul className={`${isMobileNavOpen}? 'mobile-open': 'nav-items'`}>
    //       {isIdeator && <Link to={"/home"} className={location.pathname.includes('/home')? 'blue': 'bar-icon'}><li>Post Ideas</li></Link> }
    //        {isIdeator &&  <Link to={"/chat"} className={location.pathname.includes('/chat')? 'blue': 'bar-icon'}><li>Notifications</li></Link>}
    //         {!isIdeator && <Link to={"/allideas"} className={location.pathname.includes('/allideas')? 'blue': 'bar-icon'}><li>All Ideas</li></Link>}            
    //         <Link to={"/ideas"} className={location.pathname.includes('/ideas')? 'blue': 'bar-icon'}><li>My Ideas</li></Link>
    //         <Link to={"/profile"} className={location.pathname.includes('/profile')? 'blue': 'bar-icon'}><li>Profile</li></Link>
    //         <button onClick={()=>logout()}>Logout</button>
    //         <h3 style={{marginLeft: "30px"}}>{user}</h3>
    //     </ul>
    //     <button className='mobile-toggle' onClick={toggleMobileNav}>
    //     <span className={`bar ${isMobileNavOpen ? 'bar-open' : ''}`}></span>
    //     <span className={`bar ${isMobileNavOpen ? 'bar-open' : ''}`}></span>
    //     <span className={`bar ${isMobileNavOpen ? 'bar-open' : ''}`}></span>
    //   </button>
    // </nav>
    <div className="App">
    <nav className="navbar">
      <h2 className='logo'>PitchTank</h2>
        <ul className={`navMenu ${isActive ? 'active' : ''}`}>
          {isIdeator && <Link to={"/home"} className="navLink"><li>Post Ideas</li></Link> }
           {isIdeator &&  <Link to={"/chat"} className="navLink"><li>Notifications</li></Link>}
            {!isIdeator && <Link to={"/allideas"} className="navLink"><li>All Ideas</li></Link>}            
            {isIdeator && <Link to={"/ideas"} className="navLink"><li>My Ideas</li></Link>}
            <Link to={"/profile"} className="navLink"><li>Profile</li></Link>
            <button onClick={()=>logout()}>Logout</button>
            <h3 style={{marginLeft: "30px"}}>{user}</h3>
        </ul>
        <button className={`${"hamburger"} ${isActive ? 'active' : ''}`} onClick={toggleActiveClass}>
        <span className={`bar`}></span>
        <span className={`bar`}></span>
        <span className={`bar`}></span>
      </button>
    </nav>
    </div>
  )
}
