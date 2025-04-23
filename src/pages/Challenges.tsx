
import { useState } from 'react';
import { BottomNav } from '../components/layout/BottomNav';
import { ChallengeCard } from '../components/cards/ChallengeCard';
import { mockChallenges, currentUser } from '../data/mockData';
import { Plus, ChevronRight, TrendingUp, Users, Search } from 'lucide-react';

const Challenges = () => {
  // Filter challenges
  const [activeFilter, setActiveFilter] = useState('active');
  
  // Filter options
  const filterOptions = [
    { id: 'active', label: 'Active' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'featured', label: 'Featured' },
  ];
  
  // Get filtered challenges (simplified for demo)
  const filteredChallenges = activeFilter === 'featured' 
    ? mockChallenges.filter(c => c.featured) 
    : mockChallenges;

  return (
    <div className="app-container pb-20">
      {/* Header */}
      <header className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Challenges</h1>
          <button className="p-2 bg-fitness-primary text-white rounded-full">
            <Plus size={18} />
          </button>
        </div>
        
        {/* Search bar */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fitness-muted" />
          <input 
            type="text" 
            placeholder="Search challenges..." 
            className="w-full bg-white border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-fitness-primary"
          />
        </div>
        
        {/* Filters */}
        <div className="flex overflow-x-auto pb-1 gap-2">
          {filterOptions.map((filter) => (
            <button 
              key={filter.id}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter.id 
                  ? 'bg-fitness-primary text-white' 
                  : 'bg-fitness-light text-fitness-dark hover:bg-fitness-light/80'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>
      
      {/* Challenge Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="fitness-card py-3 px-4">
            <div className="flex items-center text-fitness-primary mb-1">
              <TrendingUp size={16} className="mr-1" />
              <p className="text-xs font-medium">Your Challenges</p>
            </div>
            <p className="text-2xl font-semibold">{mockChallenges.length}</p>
            <p className="text-xs text-fitness-muted">Active now</p>
          </div>
          
          <div className="fitness-card py-3 px-4">
            <div className="flex items-center text-fitness-accent mb-1">
              <Users size={16} className="mr-1" />
              <p className="text-xs font-medium">Friends</p>
            </div>
            <p className="text-2xl font-semibold">12</p>
            <p className="text-xs text-fitness-muted">In challenges with you</p>
          </div>
        </div>
      </div>
      
      {/* Featured Challenge */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Featured Challenge</h2>
        {mockChallenges
          .filter(c => c.featured)
          .map(challenge => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge} 
              currentUserId={currentUser.id}
              className="animate-scale-in" 
            />
          ))}
      </div>
      
      {/* Active Challenges */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Active Challenges</h2>
          <button className="text-sm text-fitness-muted flex items-center">
            See all
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          {filteredChallenges.map(challenge => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge} 
              currentUserId={currentUser.id} 
            />
          ))}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Challenges;
