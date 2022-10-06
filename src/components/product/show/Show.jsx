import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';
import "./Show.css"
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

function Show({currentUser}) {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [avgReview ,setAvgReview] = useState(0)

  const getProduct = async () => {
    const product = await axios.get(`/product/${id}`);
    setProduct(product.data);
    getAvgReview(product.data.owner._id)
  };

  const getAvgReview =async (userId)=>{
    axios.defaults.withCredentials = true;
    axios.get("/review/average/" + userId )
    .then(res => setAvgReview(res.data))
    .catch(err => console.log(err))    
}

const showStars = () => {
  let a = []
  for(let i=0; i<avgReview; i++) {
    a.push(i+1)
  }
  return a
}

  useEffect(() => {
    const fetch = async () => {
      await getProduct();
    }
    fetch();
  }, []);

  if (product === undefined) return <p>Not product found.</p>;

  return (
    <Container className='product-detail'>
      <Carousel className="show-images">
        {product.images.map((img, index) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img} 
              key={index}
              alt="product_image"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="product-info">
        <div>
          <div className="show-name-div"><h1 className="show-name">{product.name}</h1></div>
          <div>
            <Link className="show-profile-link" to={`/profile/${product.owner._id}`}>Visit {product.owner.name}</Link>
          </div>
          <div>{showStars().map(r => <i class="fa-solid fa-star"></i>)} {avgReview !== 0 ? avgReview : ''}</div>
          {/* <div><Moment interval={1000} fromNow>{product.date}</Moment></div> */}
        </div>
        <div className="show-price">
          <h2>{product.price}₪</h2>
        </div>
        <div className="description-div">
          <div>{product.description}</div>
        </div>


        
        {product.owner._id === currentUser._id ? (
          <div className="Button-Div"><Link to={`/product/${product._id}/edit`}><button className="Button">Edit</button></Link></div>
        ) : (
          <div className="Button-Div"><Link to={`/product/${product._id}/rent`}><button className="Button">Rent</button></Link></div>
        )}
      </div>
    </Container>
  );
}

export default Show;
