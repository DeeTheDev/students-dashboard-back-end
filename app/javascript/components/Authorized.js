import React, { useState, useEffect} from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const Authorized  = (props) => {
    const [ user, setUser ] = useState({})
    useEffect(() => {
        const token = localStorage.getItem("token");
        // if(token) {
        //     const result = jwtDecode(token);
        //     console.log(result)
        //     setUser(result)
        // }
        if(token){
          axios.get(`http://localhost:3000/auto_login`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => console.log(response))
        //   .then(data => {
        //       console.log("data response: ", data);
        //     // setUser(data)
        //   })
          .catch(err => console.log("Error authenticating page: " + err))
        }
    }, [])
    const showUser = () => {
        return(
            user != {} ? <div>User: {user.username}</div> : <div>No user logged</div>
        )
    }
    return(
        <><div>Rendered from Authorized.js</div>
            {/* <div>Authorized dashboard status: {jwt}</div>
            <h1>Status: {props.loggedStatus} </h1> */}
            {showUser()}
        </>
    )
}

export default Authorized