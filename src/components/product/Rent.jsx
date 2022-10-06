import "./rent.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Rent(props) {

  const [rentedProduct, setRentedProduct] = useState();
  const { id } = useParams();

  const fetch = async () => {
    const product = await axios.get(`/product/${id}`);
    setRentedProduct(product.data);
  }

  useEffect(() => {
    fetch();
  }, []);


  const navigate = useNavigate();
function validateCard(){
  return (/^5[1-5]\d{14}$/.test(cardNumber))
}
function validateName(){
  return ((/[A-Za-z]/).test(fullName))
}
function validateCity(){
  return ((/[A-Za-z]/).test(city))
}
function validatePhone(){
  return (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone))
}
function validateAddress(){
  return (/^$|\s+/.test(address))
}
function validateCVV(){
  return (/^[0-9]{3,4}$/.test(CVV))
}
function validateExpireDate(){
  return (/[\d]{2}\/[\d]{4}/.test(expireDate))
}
  const [fullName, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpiryDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAdress] = useState("");
  
  let info = {
    phone,
    city,
    address,
  };
  let payment = {
    fullName,
    cardNumber,
    expireDate,
    CVV,
  };
  let paymentInfo = {
    info,
    payment,
  };
  const handleSubmit = async (evt) => {
    if(!validateCard()){
      alert("Enter a valid card")
      return
    }
    if(!validateName()){
      alert("Enter a valid name")
      return
    }
    if(!validatePhone()){
      alert("Enter A valid phone number")
      return
    }
    if(!validateCity()){
      alert("Enter A valid City")
      return
    }
    if(validateAddress()){
      alert("Enter a valid Address")
      return
    }
    if(!validateCVV()){
      alert("Enter A valid CCV")
      return 
    }
    if(!validateExpireDate()){
      alert("Enter A valid Expiry Date")
      return
    }
    console.log("in got here")
    evt.preventDefault();
    axios.defaults.withCredentials = true;
    console.log(paymentInfo);
    await axios.post(`/record/${id}`, paymentInfo);
    const product = await axios.get(`/product/${id}`);
    const ownerId = product.data.owner._id
    navigate(`/${ownerId}/history`, { replace: true });
  };
  return (
    <Container className='rent-container'>
      {rentedProduct ? (
        <div className="rent-product-info">
          <div className="rent-product-header"><h1>{rentedProduct.name}</h1></div>
          <div className="rent-price">
            <div>Price: {rentedProduct.price}</div>
            <div>Shipping: 0</div>
            <div>Total: {rentedProduct.price}</div>
          </div>
        </div>
      ) : ('')}
      <div className="rent-payment-info">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Row>
            <Col>
              <div className="rent-field">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="String" placeholder="name@example.com" value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </Col>
            <Col>
              <div className="rent-field">
                <Form.Label>City</Form.Label>
                <Form.Control type="Text" placeholder="name@example.com" value={city} onChange={(e) => setCity(e.target.value)}/>
              </div>
            </Col>
          </Row>
          <div className="rent-field">
            <Form.Label>Address</Form.Label>
            <Form.Control type="Text" placeholder="Address" value={address} onChange={(e) => setAdress(e.target.value)}/>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <div className="rent-field">
            <Form.Label>Name on card</Form.Label>
            <Form.Control type="Text" placeholder="Name on card" value={fullName} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="rent-field">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="Text" placeholder="5212345678912345" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
          </div>
          <Row>
            <Col>
              <div className="rent-field">
                <Form.Label>Expire date</Form.Label>
                <Form.Control type="String" placeholder="mm/yyyy" value={expireDate} onChange={(e) => setExpiryDate(e.target.value)}/>
              </div>
            </Col>
            <Col>
              <div className="rent-field">
                <Form.Label>CCV</Form.Label>
                <Form.Control type="Text" placeholder="504" value={CVV} onChange={(e) => setCVV(e.target.value)}/>
              </div>
            </Col>
          </Row>
        </Form.Group>
        <div className="input-buttons">
            <button onClick={handleSubmit} className="Button formButton">
              Rent
            </button>
        </div>
      </Form>
      </div>
    </Container>
  );
}

export default Rent;
