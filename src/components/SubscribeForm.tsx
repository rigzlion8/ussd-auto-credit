import { useState } from 'react';
import axios from 'axios';

interface SubscribeFormProps {
  influencerId: number;
  influencerName: string;
}

export const SubscribeForm = ({ influencerId, influencerName }: SubscribeFormProps) => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState(10);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [step, setStep] = useState<'phone' | 'pin' | 'confirmation'>('phone');

  // Verify PIN against mock API
  const verifyPin = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users?phone=${phone}&pin=${pin}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('PIN verification failed:', error);
      return false;
    }
  };

  // Handle subscription
  const handleSubscribe = async () => {
    try {
      await axios.post('http://localhost:3001/subscribers', {
        fan_phone: phone,
        influencer_id: influencerId,
        amount,
        frequency,
        is_active: true,
        created_at: new Date().toISOString()
      });
      setStep('confirmation');
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed! Check console for details.');
    }
  };

  // USSD-like flow controller
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'phone') {
      setStep('pin');
    } 
    else if (step === 'pin') {
      const isValid = await verifyPin();
      if (isValid) {
        await handleSubscribe();
      } else {
        alert('Invalid PIN! Please try again.');
        setPin('');
      }
    }
  };

  return (
    <div className="ussd-form">
      <h3>Subscribe to {influencerName}</h3>
      
      <form onSubmit={handleSubmit}>
        {step === 'phone' && (
          <div className="form-group">
            <label>Your Phone Number (254...)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="254[0-9]{9}"
              required
            />
          </div>
        )}

        {step === 'pin' && (
          <>
            <div className="form-group">
              <label>Enter USSD PIN</label>
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
                max="1000"
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
          </>
        )}

        {step === 'confirmation' ? (
          <div className="confirmation">
            <p>✅ Success! You've subscribed to {influencerName}</p>
            <p>KSh {amount} will be deducted {frequency}.</p>
          </div>
        ) : (
          <button type="submit">
            {step === 'phone' ? 'Continue' : 'Confirm Subscription'}
          </button>
        )}
      </form>
    </div>
  );
};