import React from 'react';
import {Navigate} from 'react-router-dom'
function Profile(props) {
    // console.log(props);
    const currentUser = props.currentUser
    // const reviews = props.currentUser.reviews
    console.log(currentUser);
    const reviews =[
        {
        body : "very bad " ,
        rate:1 ,
        reviewer:{username : "omar"} ,
        reviewed:{username:"muhammad "} 
        },
        {
        body : "very cool " ,
        rate:4 ,
        reviewer:{username : "anas"} ,
        reviewed:{username:"ahmad"} 
       },
       {
        body : " yyyyy  " ,
        rate:3 ,
        reviewer:{username : "khaled"} ,
        reviewed:{username:"rafat"} 
       }
    ]

    const starTages = (rate) =>{
        const  stars = []
        for (let index = 0; index < rate; index++) {
            stars.push(<span><i class="fa-sharp fa-solid fa-star text-warning"></i></span>)
        }
        return stars
    }

    return (
        <div>{currentUser ? 
        <div>
            <div className='container'>
                <div className="card w-75 mx-auto mt-5" >
                <div className="card-body text-center">
                <h5 className="card-title text-center">{currentUser.name}</h5>
                <div className=' mb-5'>
                <span className="card-title text-center"> [ 4.32 ] </span>
                <i class="fa-sharp fa-solid fa-star text-warning"></i>
                </div>
                
                
                
                <hr />
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className='text-center'><a href="#" className="btn btn-primary">Review</a></div> 
                </div>
                </div>
            </div>
            <div className='container mt-5'>
                <h2>Reviews</h2>
                <hr />
                {reviews.map(r =>(
                    <div className='p-2 m-2 border border-info'>
                        <h6>{r.reviewer.username}</h6>
                        {starTages(r.rate)}
                        <p>{r.body}</p>
                    </div>
                ))}

            </div>  
        </div>
        :<Navigate to='../login'/>}
        </div> 
    );
}

export default Profile;