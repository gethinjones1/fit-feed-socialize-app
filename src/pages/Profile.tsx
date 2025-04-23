
import { useState } from 'react';
import { BottomNav } from '../components/layout/BottomNav';
import { UserStats } from '../components/profile/UserStats';
import { ActivityCard } from '../components/cards/ActivityCard';
import { currentUser, mockActivities } from '../data/mockData';
import { Settings, ChevronRight, Edit2 } from 'lucide-react';

const Profile = () => {
  // Get current user's activities
  const userActivities = mockActivities.filter(activity => activity.userId === currentUser.id);
  
  // Tab state
  const [activeTab, setActiveTab] = useState('activities');

  return (
    <div className="app-container pb-20">
      {/* Header with profile info */}
      <header className="p-4 mb-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Profile</h1>
          <button className="p-1">
            <Settings size={22} />
          </button>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="relative">
            <img 
              src={currentUser.profileImage} 
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <button className="absolute bottom-0 right-0 bg-fitness-primary text-white p-1 rounded-full shadow-sm">
              <Edit2 size={14} />
            </button>
          </div>
          
          <div className="ml-4">
            <h2 className="text-xl font-bold">{currentUser.name}</h2>
            <p className="text-sm text-fitness-muted">@{currentUser.username}</p>
            
            <div className="flex gap-4 mt-1">
              <div>
                <span className="font-medium">{currentUser.followers}</span>
                <span className="text-xs text-fitness-muted ml-1">Followers</span>
              </div>
              <div>
                <span className="font-medium">{currentUser.following}</span>
                <span className="text-xs text-fitness-muted ml-1">Following</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bio */}
        {currentUser.bio && (
          <p className="text-sm mb-4">{currentUser.bio}</p>
        )}
        
        {/* Edit Profile Button */}
        <button className="w-full py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
          Edit Profile
        </button>
      </header>
      
      {/* Stats Section */}
      <div className="px-4 mb-4">
        <UserStats user={currentUser} />
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 px-4 mb-4">
        <div className="flex">
          <button 
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'activities' 
                ? 'border-fitness-primary text-fitness-primary' 
                : 'border-transparent text-fitness-muted hover:text-fitness-dark'
            }`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button 
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'challenges' 
                ? 'border-fitness-primary text-fitness-primary' 
                : 'border-transparent text-fitness-muted hover:text-fitness-dark'
            }`}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges
          </button>
          <button 
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'achievements' 
                ? 'border-fitness-primary text-fitness-primary' 
                : 'border-transparent text-fitness-muted hover:text-fitness-dark'
            }`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
        </div>
      </div>
      
      {/* Activities Section */}
      {activeTab === 'activities' && (
        <div className="px-4">
          {userActivities.length > 0 ? (
            userActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="text-center py-8 text-fitness-muted">
              <p>No activities yet</p>
              <button className="fitness-btn fitness-btn-primary px-6 py-2 mt-4">
                Log Your First Activity
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Placeholder for other tabs */}
      {activeTab !== 'activities' && (
        <div className="px-4 py-8 text-center text-fitness-muted">
          <p>Coming soon...</p>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Profile;
