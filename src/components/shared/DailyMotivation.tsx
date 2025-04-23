
import { useState, useEffect } from 'react';
import { motivationalQuotes } from '../../data/mockData';

interface DailyMotivationProps {
  className?: string;
}

export const DailyMotivation: React.FC<DailyMotivationProps> = ({ className = '' }) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Get a random quote from the array
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  if (!quote) return null;

  return (
    <div className={`bg-gradient-to-r from-fitness-primary to-fitness-accent text-white p-4 rounded-2xl mb-4 animate-fade-in ${className}`}>
      <q className="block text-center font-medium italic">{quote}</q>
    </div>
  );
};
