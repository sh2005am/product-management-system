import React from 'react'
import { useState, } from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './LoginPage.css'

const LoginPage = () => {
    const navigate =useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response =await Axios.post("/api/auth/login",{email,password})
            localStorage.setItem("token",response.data.token)
            console.log("login succesfull token saved")
            navigate("/products")            
        } catch (error) {
            console.log(error.response.data.message)
        }
        }

    return (
        <div className="auth-page-wrapper">
        <div className='login-container'>
            <h1>Product manager</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                <label htmlFor="email">Email:</label>
                <input type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                
                <button type='submit' className='btn'>Login</button>
               
            </div>
            </form>
             new to product manager? <button className='altBtn' onClick={() => navigate("/signup")} >signup</button>
        </div>
        </div>
    )
}

export default LoginPage
