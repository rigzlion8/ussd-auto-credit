import React from 'react';
import { InfluencerList } from './components/InfluencerList';
import { SubscribeForm } from './components/SubscribeForm';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>USSD Auto-Credit Platform</h1>
      </header>
      <main>
        <InfluencerList />
      </main>
    </div>
  );
};

export default App;
