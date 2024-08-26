import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './Login.css';

const AddBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/book/add', { name, author, imageUrl })
            .then(res => {
                if (res.data.added) {
                    navigate('/books');
                }
                else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Add Book</h2>
                <div className="form-group">
                    <label htmlFor="name">Book Name</label>
                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Book Author: </label>
                    <input type="text" id="author" name="author" onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image Url: </label>
                    <input type="text" id="image" name="image" onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <button type='submit' className='btn-login'>Add Book</button>
            </form>
        </div>
    );
}

export default AddBook