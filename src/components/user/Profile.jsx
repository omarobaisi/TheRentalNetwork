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
          getUserName(id)
          getAvgReview()
          getReviews()
    },[])
    
    const getUserName = async (id)=>{
        axios.defaults.withCredentials = true;
        await axios.get("http://localhost:4000/user/"+ id )
        .then(res => setUser(res.data.name))
        .catch(err => console.log(err))  
    }

    const getAvgReview =async ()=>{
        axios.defaults.withCredentials = true;
        await axios.get("http://localhost:4000/review/average/" + id )
        .then(res => setAvgReview(res.data))
        .catch(err => console.log(err))    
    }

    const getReviews =  async ()=>{
        axios.defaults.withCredentials = true;
        await axios.get("http://localhost:4000/review/user/" + id )
        .then(async res => {
            const reviewdIds = await res.data.map((r)=>(
            {   
                reviwersId:r.reviewer,
                body:r.body,
                rate:r.rate
            }
            ));
            setReviews(reviewdIds)
            getReviwersNames(reviewdIds)
        })
        .catch(err => console.log(err)) 
    }

    const getReviwersNames =async (reviwers)=>{
        const temp = [] 
        await reviwers.map(async r =>{
            axios.defaults.withCredentials = true;
            await axios.get("http://localhost:4000/user/"+r.reviwersId)
            .then(res => {
                let reviwerName = res.data.name
                const tempReviwer = {reviwerName ,  body:r.body , rate :r.rate}
                temp.push(tempReviwer)
                 setReviwersNames(temp)
            })
            .catch(err => console.log(err)) 
        })
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
                {!reviews===[]? reviews.map((r,index) =>(
                    <div className='p-2 m-2 border border-info' key={Math.random()}>
                        {/* <h6>{r.reviewer.username}</h6> */}
                        <h6>{reviwersNames[index]}</h6>
                        {starTages(r.rate)}
                        <p>{r.body}</p>
                    </div>
                )):""}

            </div>  
        </div>
        :<Navigate to='../login'/>}
        </div> 
    );
}

export default Profile;