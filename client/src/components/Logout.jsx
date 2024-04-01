import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ setRoleG }) => {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/auth/logout')
        .then(res => {
            if(res.data.logout) {
                setRoleG('');
                navigate('/');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
}

export default Logout;