import axios from 'axios'
// import React from 'react'

const BookLelo = () => {

    const handleBookLelo = async () => {
        const res = await axios.get('https://book-store-backend-z5yv.onrender.com/api/demoroute');
        console.log(res.data)
    }
    return (
        <div>BookLelo


            <button onClick={handleBookLelo}>Send</button>
        </div>
    )
}

export default BookLelo