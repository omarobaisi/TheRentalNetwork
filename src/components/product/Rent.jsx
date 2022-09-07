import "./rent.css";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
function Rent(props) {
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

  const { id } = useParams();
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    axios.defaults.withCredentials = true;
    console.log(paymentInfo);
    await axios.post(`http://localhost:4000/record/${id}`, paymentInfo);
  };
//   const handleCardNumber =(e)=>{
//     if(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(cardNumber))
//   }
  return (
    <div className="payment-container">
      <div className="wrapper">
        <div className="outer-card">
          <div className="forms">
            <div className="input-items">
              <div className="input-items">
                <span>Name on card</span>
                <input
                  placeholder="Samuel Iscon"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <span>Card Number</span>
              <input
                placeholder="card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="one-line">
              <div className="input-items">
                <span>City</span>
                <input
                  placeholder="Samuel Iscon"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="input-items">
                <span>Phone</span>
                <input
                  placeholder="phone number"
                  value={phone}
                  type="Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="input-items">
              <span>Address</span>
              <input
                placeholder="your Address"
                value={address}
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>

            <div className="one-line">
              <div className="input-items">
                <span>Expiry Date</span>
                <input
                  placeholder="mm/yyyy"
                  value={expireDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="input-items">
                <span>CVV</span>
                <input
                  placeholder="..."
                  value={CVV}
                  onChange={(e) => setCVV(e.target.value)}
                />
              </div>
            </div>
            <div className="input-buttons">
              <button onClick={handleSubmit} className="paybtn">
                pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rent;
