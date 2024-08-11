import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './forgotpassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://clothing-backend-two.vercel.app/forgot-password', { email });
            toast.success(response.data.message);
            setStep(2); // Proceed to OTP verification step
        } catch (error) {
            toast.error(error.response?.data.error || 'An error occurred');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://clothing-backend-two.vercel.app/forgot-password/verify', { email, otp });
            toast.success(response.data.message);
            setStep(3); // Proceed to new password step
        } catch (error) {
            toast.error(error.response?.data.error || 'An error occurred');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://clothing-backend-two.vercel.app/forgot-password/reset-password', { email, newPassword });
            toast.success(response.data.message);
            navigate('/login');
            // Optionally, redirect to login page or show a success message
        } catch (error) {
            toast.error(error.response?.data.error || 'An error occurred');
        }
    };

    return (
        <>
            {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button className='Buttons' type="submit">Send OTP</button>
                </form>
            ) : step === 2 ? (
                <form onSubmit={handleVerifyOtp}>
                    <div>
                        <label>OTP</label>
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    </div>
                    <button className='Buttons' type="submit">Verify OTP</button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <div>
                        <label>New Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <button className='Buttons' type="submit">Reset Password</button>
                </form>
            )}
            <ToastContainer />
        </>
    );
};

export default ForgotPassword;
