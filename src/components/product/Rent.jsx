import './rent.css'
import axios from 'axios'
import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
function Rent(props) {
    const [name, setName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const[expiryDate,setExpiryDate]= useState("")
    const[ccv,setCCV]= useState("")

    let paymentInfo = {
        name,cardNumber,expiryDate,ccv
    }
    const {id} = useParams()
    const  handleSubmit = async(evt)=> {
        evt.preventDefault();
        axios.defaults.withCredentials = true;
       await axios.post(`http://localhost:4000/record/${id}`,)
    }
    return (
        <div className="payment-container">
        <div className="wrapper">
            <div className="outer-card">
                <div className="forms">
                    <div className="input-items">
                        <span>Card Number</span>
                        <input placeholder="card Number" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} /></div>
                        <div className="input-items">
                            <span>Name on card</span>
                            <input placeholder="Samuel Iscon" value={name} onChange={e=>setName(e.target.value)}/></div>
                            <div className="one-line">
                                <div className="input-items">
                                    <span>Expiry Date</span>
                                    <input placeholder="mm/yyyy" value={expiryDate} onChange={e=>setExpiryDate(e.target.value)}/></div>
                                    <div className="input-items">
                                        <span>CVV</span>
                                        <input placeholder="..." onChange={e=>setCCV(e.target.value)}/></div>
                                    </div>
                                    <div className="input-buttons">
                                        <button onClick={handleSubmit} className='paybtn'>pay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                    }
                    
                    export default Rent;
