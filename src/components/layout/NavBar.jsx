import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Link, useSearchParams } from 'react-router-dom'
import Logout from '../auth/Logout'
import { AuthContext, useAuth } from '../auth/AuthProvider';

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const { user } = useContext(AuthContext)

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  }
  //const isLoggedIn = localStorage.getItem("token");
  //const userRole = localStorage.getItem("userRole");
  const isLoggedIn = user !== null
  const userRole = localStorage.getItem("userRole")

  const {logoutMessage, setLogoutMessage} = useAuth()
  const [message, setMessage] = useState(logoutMessage)
  useEffect(() => {
    if (logoutMessage) {
      setMessage(logoutMessage)
      const timer = setTimeout(() => {
        setMessage(null)
        setLogoutMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [logoutMessage, setLogoutMessage])

  return (    
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
      {message && (
        <div 
          className="position-fixed top-0 end-0 p-3" 
          style={{ zIndex: 9999 }}
        >
          <div className="toast show align-items-center text-bg-success border-0 shadow">
            <div className="d-flex">
              <div className="toast-body">
                {message}
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => {setMessage(null); setLogoutMessage(null)}}
              ></button>
            </div>
          </div>
        </div>
      )}
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <span className="hotel-color">Demo Hotel</span>
        </Link>
        <button 
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>  
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                Browse all rooms
              </NavLink>              
            </li>

            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                    Admin
                </NavLink>              
              </li>
            )}
            
          </ul>
          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-booking"}>
                Find My Booking
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
              className={`nav-link dropdown-toggle ${showAccount ? "show":""}`}
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={handleAccountClick}>
                {" "}
                Account
              </a>
              <ul className={`dropdown-menu ${showAccount?"show":""}`} aria-labelledby="navbarDropdown">
                {isLoggedIn?(                    
                  
                <Logout/>
                ):(
                <>
                  <li>
                    <Link className="dropdown-item" to={"/login"}>
                      Login
                    </Link>
                  </li>
                </>       
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
