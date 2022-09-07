import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, Navigate, useParams} from 'react-router-dom'
function Profile({currentUser}) {

    let id = useParams().id
    const [userName , setUser]=useState("")
    const [reviews , setReviews] = useState([])
    const [avgReview ,setAvgReview] = useState(0)

    useEffect(()=>{
        getUserName(id)
        getAvgReview()
        getReviews()
    },[])
    
    const getUserName = async (id)=>{
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:4000/user/"+ id )
        .then(res => setUser(res.data))
        .catch(err => console.log(err))  
    }

    const getAvgReview =async ()=>{
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:4000/review/average/" + id )
        .then(res => setAvgReview(res.data))
        .catch(err => console.log(err))    
    }

    const getReviews =  async ()=>{
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:4000/review/user/" + id )
        .then(res => {
            setReviews(res.data);
        })
        .catch(err => console.log(err)) 
    }

    const starTages = (rate) =>{
        const  stars = []
        for (let index = 0; index < rate; index++) {
            stars.push(<span><i className="fa-sharp fa-solid fa-star text-warning"></i></span>)
        }
        return stars
    }

    return (
        <div>{id ? 
        <div>
            <div className='container'>
                <div className="card w-75 mx-auto mt-5" >
                <div className="card-body text-center">
                <h5 className="card-title text-center">{userName.name}</h5>
                <div className=' mb-5'>
                <span className="card-title text-center"> [ {avgReview} ] </span>
                <i className="fa-sharp fa-solid fa-star text-warning"></i>
                </div>
                <hr />
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                {currentUser !== '' && currentUser._id !== userName._id ? (
                    <div className='text-center'><Link to={`/review/${id}`}><button className='Button'>Review</button></Link></div> 
                ) : (
                    <div className='text-center'><Link to={`/${id}/history`}><button className='Button'>History</button></Link></div> 
                )}
                </div>
                </div>
            </div>
            <div className='container mt-5'>
                <h2>Reviews</h2>
                <hr />
                {reviews!==[] ? (
                    reviews.map((r, i) => (
                        <div className='p-2 m-2 border' key={i}>
                            <h6>{r.reviewer.name}</h6>
                            <div>{starTages(r.rate)}</div>
                            <p>{r.body}</p>
                        </div>
                    ))
                ) : ""}
            </div>  
        </div>
        :<Navigate to='../login'/>}
        </div> 
    );
}

export default Profile;