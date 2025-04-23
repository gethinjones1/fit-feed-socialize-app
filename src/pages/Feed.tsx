
import { useState } from 'react';
import { BottomNav } from '../components/layout/BottomNav';
import { ActivityCard } from '../components/cards/ActivityCard';
import { mockActivities, currentUser } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'friends', label: 'Friends' },
    { id: 'running', label: 'Running' },
    { id: 'cycling', label: 'Cycling' },
    { id: 'gym', label: 'Gym' },
    { id: 'yoga', label: 'Yoga' },
  ];

  return (
    <div className="app-container pb-20">
      {/* Header */}
      <header className="p-4">
        <h1 className="text-xl font-semibold mb-4">Activity Feed</h1>
        
        {/* Search bar */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fitness-muted" />
          <input 
            type="text" 
            placeholder="Search activities..." 
            className="w-full bg-white border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-fitness-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      
      {/* Activities Feed */}
      <div className="px-4">
        {mockActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Feed;
