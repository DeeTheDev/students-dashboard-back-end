import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Users = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch('http://localhost:3000/api/v1/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
        })
        setEmail("") 
        setPassword("")
    }

    const handleAuthClick = () => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/api/v1/auto_login`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
      }

    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }
    return(
        <div>
            <div style={formDivStyle}>
                <h1>Log In</h1>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Username</label>
                        <input value={email} onChange={handleEmailChange} type="text" placeholder="email"/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                    </div>
                    
                    <button className="ui button" type="submit">Submit</button>
                    <button onClick={handleAuthClick} className="ui button">Access Authorized Route</button>
                </form>
            </div>
        </div>
    )
}

export default Users