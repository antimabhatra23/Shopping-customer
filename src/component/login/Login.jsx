import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            toast.success(response.data.message);  // Show success toast
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            setIsLoggedIn(true);  // Update login state
            navigate('/');  // Redirect to products page
        } catch (error) {
            toast.error(error.response?.data.error || 'An error occurred');  // Show error toast
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>

                <div className='Noaccount'>
                    <Link to="/signup">Not Have An Account? Sign Up</Link>
                </div>
                <div className='forgotPassword'>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </form>

            <ToastContainer />  {/* Add ToastContainer here */}
        </>
    );
};

export default Login;
