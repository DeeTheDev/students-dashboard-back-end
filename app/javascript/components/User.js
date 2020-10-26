import React, { useEffect, useState } from 'react'
import axios from 'axios'

const User = (props) => {
    const [users, usersSet] = useState({})

    useEffect(() =>{
        const id_param = props.match.params.id
        const url =   `/api/v1/users/${id_param}`

        axios.get(url)
        .then(res=> console.log(res))
        .catch(res=>console.log(res))
    }, [])
    return <div>This is the main USER Show component for our app.</div>
}

export default User