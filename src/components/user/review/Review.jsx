import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import {Rating} from 'react-simple-star-rating'
import "./Review.css"
import Container from 'react-bootstrap/Container';

function Review({currentUser}) {
    const navigate = useNavigate();
    const {userId} = useParams()
    const [rate, setRating] = useState(0)
    const [body, setReviewText] = useState("")
    const [userName, setuserName] = useState("")
    useEffect(()=>{
        async function fetchData() {
            const user = await axios.get("http://localhost:4000/user/"+ userId )
            setuserName(user.data.name);
        }
        fetchData();
    },[])
    let review = {
        rate,
        body
    }
    const  handleSubmit = async(evt)=> {
        evt.preventDefault();
        axios.defaults.withCredentials = true;
        await axios.post(`http://localhost:4000/review/${userId}`, review)
        navigate(`/profile/${userId}`, { replace: true });
    }
    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <div>{currentUser ? 
        <Container className='review-container'>
            <div className='reviewer'><h2>Review {userName}</h2></div>
            <Rating className='star-rating' onClick={handleRating}
                ratingValue={rate}/>
                <div>
                <textarea name="reviewTextArea" type="text" cols="80" rows="5" placeholder='Review body'
                value={body}
                onChange={
                    e => setReviewText(e.target.value)
            }></textarea>
                </div>
                
            <button className='Button' onClick={handleSubmit}>Review</button>
        </Container>
        :<Navigate to='../../login'/>}
        </div> 
    )
}

export default Review;