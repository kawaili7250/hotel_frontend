import React, { useState } from 'react'
import { login } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  const auth = useAuth()
  const location = useLocation()
  const redirectUrl = location.state?.path || "/"
  //const { handleLogin } = useContext(AuthProvider)

  const handleInputChange = (e) => {
    setLoginInfo({...loginInfo, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const success = await login(loginInfo)
    if (success) {
        const token = success.token
        //handleLogin(token)
        auth.handleLogin(token)
        //navigate("/")
        navigate(redirectUrl, {replace: true})
        //window.location.reload()
    } else {
        setErrorMessage("Invalid username or password. Please try again!")
    }
    setTimeout(() => {
        setErrorMessage("")
    }, 4000)
  }
  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div>
            <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={loginInfo.email}
            onChange={handleInputChange}/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div>
            <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={loginInfo.password}
            onChange={handleInputChange}/>
          </div>
        </div>

        <div className="mb-3">
          <button 
          type="submit" 
          className="btn btn-hotel"
          style={{marginRight:"10px"}}>
            Login
          </button>
          <span style={{marginLeft:"10px"}}>
            Don't have account yet? <Link to={"/register"}>Register</Link>
          </span>
        </div>
      </form>
    </section>
  )
}

export default Login
