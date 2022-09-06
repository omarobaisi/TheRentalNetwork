import axios from 'axios'
import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import {Rating} from 'react-simple-star-rating'

function Review(props) {
    const [rate, setRating] = useState(0)
    const [body, setReviewText] = useState("")
    let review = {
        rate,
        body
    }
    const {userId} = useParams()
    const  handleSubmit = async(evt)=> {
        evt.preventDefault();
        axios.defaults.withCredentials = true;
       await axios.post(`http://localhost:4000/review/${userId}`, review)
        console.log(review)
    }
    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <div className='review-container'>
            <div className='reviewer'>Name</div>
            <Rating onClick={handleRating}
                ratingValue={rate}/>
                <div>
                <textarea name="reviewTextArea" type="text" cols="80" rows="5"
                value={body}
                onChange={
                    e => setReviewText(e.target.value)
            }></textarea>
                </div>
                
            <button onClick={handleSubmit}> Submit</button>
        </div>
    )
}

export default Review;