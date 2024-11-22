import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      navigate('/form');
    } catch (err) {
      setError("Failed to register. Try a different email.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); 
      navigate('/form');
    } catch (err) {
      setError("Failed to log in. Check your credentials.");
    }
  };

  const handleSalesChange = (e) => {
    setTotalSales(e.target.value);
  };

  const handleProfitChange = (e) => {
    setTotalProfit(e.target.value);
  };

  return (
    <div className="login-register-container d-flex justify-content-center align-items-center">
      <div className="login-register-card shadow-lg p-4">
        <h2 className="text-center mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control animated-input"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control animated-input"
              placeholder="Password"
              required
            />
          </div>
         
          <button type="submit" className="btn btn-primary w-100 animated-button">
            {isRegistering ? 'Register' : 'Login'}
          </button>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </form>
        <button onClick={() => setIsRegistering(!isRegistering)} className="btn btn-link toggle-button mt-3 w-100">
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </div>
    </div>
  );
}

export default LoginRegister;
