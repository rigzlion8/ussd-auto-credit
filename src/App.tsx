import React from 'react';
import { InfluencerList } from './components/InfluencerList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">
          <img 
            src="/logo.png" // Update with your actual logo path
            alt="USSD AutoPay Platform" 
            className="navbar-logo"
          />
          <span className="platform-name">USSD AutoPay</span>
        </div>
        
        <div className="navbar-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Features</a>
          <a href="#" className="nav-link">Pricing</a>
          <a href="#" className="nav-link">Contact</a>
        </div>
        
        <div className="navbar-auth">
          <a href="/login" className="auth-link login-link">Login</a>
          <a href="/signup" className="auth-link signup-link">Sign Up</a>
        </div>
      </nav>

      <main className="main-content">
        <InfluencerList />
      </main>
    </div>
  );
};

export default App;