import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import './Login.css';

const EditBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/book/book/${id}`)
            .then(res => {
                setName(res.data.name);
                setAuthor(res.data.author);
                setImageUrl(res.data.imageUrl);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/book/book/${id}`, { name, author, imageUrl })
            .then(res => {
                if (res.data.updated) {
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
                <h2>Edit Book</h2>
                <div className="form-group">
                    <label htmlFor="name">Book Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Book Author: </label>
                    <input type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image Url: </label>
                    <input type="text" id="image" name="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <button type='submit' className='btn-login'>Update</button>
            </form>
        </div>
    );
}

export default EditBook;