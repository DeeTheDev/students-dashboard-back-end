import React from 'react'

const Authorized  = (props) => {
    const jwt = window.localStorage.getItem('jwt');
    return(
        <>
            <div>Authorized dashboard status: {jwt}</div>
            <h1>Status: {props.loggedStatus}</h1>
        </>
    )
}

export default Authorized