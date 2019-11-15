import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateForm(props) {

    const [movie, setMovie] = useState({
        id: "",
        tittle: "",
        director: "",
        metascore: "",
        stars: []
    });


    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then((response) => {
                console.log(response.data)
                setMovie(response.data)
            })
    }, [props.match.params.id])


    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }
    const handleStars = (e) => {
        setMovie({
            ...movie,
             stars: [e.target.value]
        })
     }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(movie)
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                console.log(res);
                setMovie({
                    id: "",
                    tittle: "",
                    director: "",
                    metascore: "",
                    stars: []
                });
                props.history.push("/");

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="save-wrapper">
            <h1>Update your Movie</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text"
                    placeholder="Title"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                />

                <br />
                <label>Director:</label>
                <input type="text"
                    placeholder="Director"
                    name="director"
                    value={movie.director}
                    onChange={handleChange} />
                <br />
                <label>Meta-Score:</label>
                <input type="text"
                    placeholder="Meta score"
                    name="metascore"
                    value={movie.metascore}
                    onChange={handleChange} />
                <br /><label>Stars:</label>
                <input
                    type='text'
                    name='stars'
                    placeholder='stars'
                    value={movie.stars}
                    onChange={handleStars}
                />
                <button>Update</button>
            </form>
        </div>
    )
}