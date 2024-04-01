import React, { useEffect } from 'react'
import './Home.css'
import axios from 'axios'

const Home = ({ setRoleG }) => {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
    .then(res => {
      if(res.data.login) {
        setRoleG(res.data.role);
      }
      else {
        setRoleG('');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className='hero'>
      <div className="hero-content">
          <h1 className='hero-heading'>Book Store</h1>
          <p className='hero-desc'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia soluta ducimus vero voluptatibus beatae debitis vitae! Veritatis recusandae ea magni!</p>
      </div>
        <div className="hero-image"></div>
    </div>
  )
}

export default Home