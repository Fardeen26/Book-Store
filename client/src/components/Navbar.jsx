import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = ({role}) => {
  return (
    <nav className='navbar'>
      <div className="nav-left">
        <Link to="/" className='nav-logo'>Book Store</Link>
      </div>
      <div className="nav-right">
        <Link to='/books' className='nav-link'>Books</Link>
        { 
            role === 'admin' && 
            <>
                <Link to='/dashboard' className='nav-link'>Dashboard</Link>
                <Link to='/addbook' className='nav-link'>Add Book</Link>
                <Link to='/addstudent' className='nav-link'>Add Student</Link>
            </>
        }
        {
          role === "" ? <Link to='/login' className='nav-link'>Login</Link>
          : <Link to='/logout' className='nav-link'>Logout</Link>
        }
      </div>
    </nav>
  )
}

export default Navbar