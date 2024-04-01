import React, { useState, useEffect} from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import './BookCard.css';

const Books = ({role}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/book/books')
    .then(res => {
      setBooks(res.data);
      console.log(res.data);
    }).catch(err => console.log(err));
  },[]);

  return (
    <div className='book-list'>
      {
        books.map((book,index) => {
          return <BookCard key={index} book = {book} role={role}></BookCard>
        })
      }
    </div>
  )
};

export default Books;