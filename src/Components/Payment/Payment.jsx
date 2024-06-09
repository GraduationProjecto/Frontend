// src/PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';

const PaymentForm = () => {
    const { id } = useParams(); // Get auction ID from URL parameters
    const [formData, setFormData] = useState({
        type: 'creditcard',
        name: '',
        number: '',
        cvc: '',
        month: '',
        year: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/Auction/pay/${id}`, formData , {
            headers: {
              authorization: `Bearer__${localStorage.getItem("token")}`,
            },
          })
            .then(response => {
                console.log('Payment Successful', response.data);
                console.log(response.data.response.source.transaction_url)
                window.location.href = response.data.response.source.transaction_url
            })
            .catch(error => {
                console.error('There was an error making the payment!', error);
            });
    };

    return (
        <div className="payment-form">
            <h2>Payment Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-groupp">
                    <label htmlFor="name">Name on Card</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-groupp">
                    <label htmlFor="number">Card Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-groupp">
                    <label htmlFor="cvc">CVC</label>
                    <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-groupp">
                    <label htmlFor="month">Expiration Month</label>
                    <input
                        type="text"
                        id="month"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-groupp">
                    <label htmlFor="year">Expiration Year</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className='btnn' type="submit">Submit Payment</button>
            </form>
        </div>
    );
};

export default PaymentForm;
