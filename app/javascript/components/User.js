import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SessionStore from './sessions/session_store.js';
import AuthActions from './sessions/auth_actions.js';

const User = (props) => {
    // const [user, userSet] = useState({})

    // useEffect(() =>{
    //     const id_param = props.match.params.id
    //     const url =   `/api/v1/users/${id_param}`

    //     axios.get(url)
    //     .then(response=> userSet(response.data))
    //     .catch(res=>console.log(res))
    // }, [])
    const handleLogout =(e) => {
        e.preventDefault();
        AuthActions.logout();
    }
    const result = () => {
        if (SessionStore.isLoggedIn()) {
            return (
              <div className='UserControls'>
                <span>{SessionStore.getUsername}</span>
                <a href='#' onClick={handleLogout}>Logout</a>
              </div>
            );
          } else {
            return (
              <div className='UserControls'>
                <a href='#/login'>Login</a>
              </div>
            );
          }
    }
    return (
        // <div>
        //     {user != {} ? `User of id ${props.match.params.id} is ${user}` : "Not logged in" }
        // </div>
        result()
    )
}

export default User