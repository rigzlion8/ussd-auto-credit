import { useInfluencers } from '../hooks/useInfluencers';
import { SubscribeForm } from './SubscribeForm';

export const InfluencerList = () => {
  const { influencers, isLoading, error } = useInfluencers();

  if (isLoading) return <div className="loading">Loading influencers...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="influencer-list">
      <h2>Available Creators</h2>
      {influencers.length === 0 ? (
        <p>No influencers found</p>
      ) : (
        <ul>
          {influencers.map((influencer) => (
            <li key={influencer.id} className="influencer-card">
              <div className="influencer-info">
                <h3>{influencer.name}</h3>
                <p>Phone: {influencer.phone}</p>
                <p>Balance: KSh {influencer.balance}</p>
              </div>
              <SubscribeForm 
                influencerId={influencer.id} 
                influencerName={influencer.name} 
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};