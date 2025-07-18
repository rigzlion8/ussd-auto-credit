import { useInfluencers } from '../hooks/useInfluencers';
import { SubscribeForm } from './SubscribeForm';

interface Influencer {
  id: number;
  name: string;
  phone: string;
  balance: number;
  imageUrl?: string; // Make imageUrl optional
}

export const InfluencerList = () => {
  const { influencers, isLoading, error } = useInfluencers();

  if (isLoading) return <div className="loading">Loading influencers...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  // Function to get profile image URL or placeholder
  const getProfileImage = (influencer: Influencer) => {
    if (influencer.imageUrl) {
      return influencer.imageUrl;
    }
    // Return a colorful placeholder based on name initials
    const initials = influencer.name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&size=50&rounded=true&color=fff`;
  };

  return (
    <div className="influencer-list">
      <h2>Available Creators</h2>
      {influencers.length === 0 ? (
        <p>No influencers found</p>
      ) : (
        <ul className="influencer-items">
          {influencers.map((influencer) => (
            <li key={influencer.id} className="influencer-item">
              <div className="influencer-profile">
                <div className="profile-image-container">
                  <img 
                    src={getProfileImage(influencer)}
                    alt={influencer.name}
                    className="profile-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=USR&background=cccccc&size=50&rounded=true';
                    }}
                  />
                </div>
                <h3 className="influencer-name">{influencer.name}</h3>
              </div>
              <SubscribeForm 
                influencerId={influencer.id} 
                influencerName={influencer.name} 
                influencerPhone={influencer.phone}
                influencerBalance={influencer.balance}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};