import React from 'react'
import pagenotfoundImage from "./wp404error.jpg";
import './notfound.css'

const PageNotFound = () => {
    return (
    
                <div className="pageNotFound">

                    <h1>Oops..! 404 Page Not Found</h1>
                    <p>Loos like you came to wrong page on our server</p>
                    <img  className="imgNotFound"src={pagenotfoundImage} width="500" alt="not found" />
                </div>
    )
}

export default PageNotFound;