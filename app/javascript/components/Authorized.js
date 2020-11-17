import React, { useState, useEffect} from 'react'
import axios from 'axios'
const Authorized  = (props) => {
    const [ user, setUser ] = useState({});
    useEffect(() => {
            axios({
                // headers: {
                // Authorization: `Bearer ${token}`
                // }
                method: 'get',
                url: 'http://localhost:3000/api/v1/auto_login',
                credentials: 'include'
            })
            .then(response => setUser(response.data))
            .catch(response => console.log("Error: ", response))
            // .then(data=> console.log("data: ", data))
            // .then(data => {
            //     console.log("data response: ", data);
            //     setUser(data)
            // })
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
    , [setUser])
    const username = () => {
        return user.username
    }
    const showUser = () => {
        return(
            Object.keys(user).length !== 0 ? <div>Logged in username: {user.username}</div> : <div>No user logged</div> 
        )
    }
    return(
        <><div>Rendered from Authorized.js</div>
            {/* <div>Authorized dashboard status: {jwt}</div>
            <h1>Status: {props.loggedStatus} </h1> */}
            <div>{showUser()}</div>
        </>
    )
}

export default Authorized