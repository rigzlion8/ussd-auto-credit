import { useState, useEffect } from 'react';
import axios from 'axios';

interface Influencer {
  id: number;
  name: string;
  phone: string;
  balance: number;
}

export const useInfluencers = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/influencers');
        setInfluencers(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  return { influencers, isLoading, error };
};