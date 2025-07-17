import { useState } from 'react';
import axios from 'axios';
import './SubscribeForm.css'; // Create this file for component-specific styles

interface SubscribeFormProps {
  influencerId: number;
  influencerName: string;
  influencerPhone: string;
  influencerBalance: number;
}

export const SubscribeForm = ({ 
  influencerId, 
  influencerName,
  influencerPhone,
  influencerBalance
}: SubscribeFormProps) => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState(10);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [step, setStep] = useState<'phone' | 'pin' | 'confirmation'>('phone');

  const verifyPin = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users?phone=${phone}&pin=${pin}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('PIN verification failed:', error);
      return false;
    }
  };

  const handleSubscribe = async () => {
    try {
      await axios.post('http://localhost:3001/subscribers', {
        fan_phone: phone,
        influencer_id: influencerId,
        amount,
        frequency,
        is_active: true
      });
      setStep('confirmation');
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'phone') {
      setStep('pin');
    } else if (step === 'pin') {
      const isValid = await verifyPin();
      if (isValid) {
        await handleSubscribe();
      } else {
        alert('Invalid PIN!');
        setPin('');
      }
    }
  };

  return (
    <div className="influencer-card">
      <div className="influencer-info">
        <h3>{influencerName}</h3>
        <p>Phone: {influencerPhone}</p>
        <p>Balance: KSh {influencerBalance}</p>
      </div>

      {step === 'phone' && (
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-group">
            <label>Your Phone (254...)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="254[0-9]{9}"
              required
            />
          </div>
          <button type="submit">Continue</button>
        </form>
      )}

      {step === 'pin' && (
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-group">
            <label>USSD PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount (KSh)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="10"
              required
            />
          </div>
          <div className="form-group">
            <label>Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button type="submit">Confirm</button>
        </form>
      )}

      {step === 'confirmation' && (
        <div className="confirmation">
          <p>✅ Subscribed!</p>
          <p>{amount} KSh {frequency}</p>
        </div>
      )}
    </div>
  );
};