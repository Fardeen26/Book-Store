import React from 'react'
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book, role }) => {
  const { name, author, imageUrl } = book;
  return (
    <div className='book-card'>
      <img src={imageUrl} alt={name} className='book-image' />
      <div className="book-details">
        <h3>{name}</h3>
        <h4>{author}</h4>
      </div>

      {role === 'admin' &&
        <div className="book-actions">
          <button> <Link to={`/book/${book._id}`}>Edit</Link> </button>
          <button> <Link to={`/delete/${book._id}`}>Delete</Link> </button>
        </div>
      }

    </div>
  )
}

export default BookCard;