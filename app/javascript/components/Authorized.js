import React, { useState, useEffect} from 'react'
import axios from 'axios'
const Authorized  = (props) => {
    const [ user, setUser ] = useState({})
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token){
            axios.get(`http://localhost:3000/api/v1/auto_login`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(response => console.log(response))
            .then(data=> console.log("data: ", data))
            .then(data => {
                console.log("data response: ", data);
                // setUser(data)
            })
            // fetch(`http://localhost:3000/api/v1/auto_login`, {
            //     headers: {
            //         "Authorization": `Bearer ${token}`
            //     }
            // })
            // .then(resp => resp.json())
            // .then(data => {
            //     console.log(data)
            //     setUser(data);
            // })
            // .catch(err => console.log("Error authenticating page: " + err))
        }
    }, [])
    const showUser = () => {
        return(
            user == {} ? <div>No user logged</div> :<div>User: {user.username}</div> 
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