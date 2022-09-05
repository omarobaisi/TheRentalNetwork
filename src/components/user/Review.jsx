import React from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

function Review(props) {

    const {userId} = useParams();

    const request = () => {
        const info = {
            body: "cool",
            rate: 4
        }
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/review/${userId}`, info)
    }

    return (
        <div>
            <button onClick={request}>CLick me</button>
        </div>
    );
}

export default Review;