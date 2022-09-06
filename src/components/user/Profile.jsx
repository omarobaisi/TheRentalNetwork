import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, Navigate, useParams} from 'react-router-dom'
function Profile(props) {

    let id = useParams().id
    const [reviwersNames ,setReviwersNames]=useState(["anas"])
    const [userName , setUser]=useState("")
    const [reviews , setReviews] = useState([])
    const [avgReview ,setAvgReview] = useState(0)

    useEffect(()=>{
        async function fetchData() {
            await getUserName(id)
            await getAvgReview()
            getReviews()
        }
        fetchData();
    },[])
    
    const getUserName = async (id)=>{
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:4000/user/"+ id )
        .then(res => setUser(res.data.name))
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

    const getReviwersNames =async (reviwers)=>{
        const temp = []
        reviwers.map(r => {
            axios.defaults.withCredentials = true;
            axios.get("http://localhost:4000/user/"+r.reviwersId)
            .then(res => {
                let reviwerName = res.data.name
                const tempReviwer = {reviwerName ,  body:r.body , rate :r.rate}
                temp.push(tempReviwer)
            })
            .catch(err => console.log(err)) 
        })
        setReviwersNames(temp)
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
                <h5 className="card-title text-center">{userName}</h5>
                <div className=' mb-5'>
                <span className="card-title text-center"> [ {avgReview} ] </span>
                <i className="fa-sharp fa-solid fa-star text-warning"></i>
                </div>
                <hr />
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className='text-center'><Link to={`/review/${id}`} className="btn btn-primary w-50">Review</Link></div> 
                </div>
                </div>
            </div>
            <div className='container mt-5'>
                <h2>Reviews</h2>
                <hr />
                {reviews!==[] ? (
                    reviews.map((r, i) => (
                        <div className='p-2 m-2 border border-info' key={i}>
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