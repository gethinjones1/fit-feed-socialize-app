
import React from 'react';
import { User } from '../../types/models';
import { ProgressRing } from '../ui/ProgressRing';
import { CalendarDays, MapPin, Clock, Award } from 'lucide-react';

interface UserStatsProps {
  user: User;
  className?: string;
}

export const UserStats: React.FC<UserStatsProps> = ({ user, className = '' }) => {
  // Calculate streak progress percentage (assuming max streak might be 30 days)
  const streakProgress = (user.stats.streak / 30) * 100;
  
  // Calculate level progress (assuming each level has 100 points)
  const levelProgress = 65; // This would come from backend in real app
  
  return (
    <div className={`${className}`}>
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="fitness-card p-3 text-center">
          <p className="text-xs text-fitness-muted mb-1">Activities</p>
          <p className="text-xl font-semibold">{user.stats.totalActivities}</p>
        </div>
        
        <div className="fitness-card p-3 text-center">
          <p className="text-xs text-fitness-muted mb-1">Distance</p>
          <p className="text-xl font-semibold">{user.stats.totalDistance.toLocaleString(undefined, { maximumFractionDigits: 0 })}<span className="text-xs"> km</span></p>
        </div>
        
        <div className="fitness-card p-3 text-center">
          <p className="text-xs text-fitness-muted mb-1">Time</p>
          <p className="text-xl font-semibold">{Math.round(user.stats.totalDuration / 60)}<span className="text-xs"> h</span></p>
        </div>
      </div>
      
      {/* Streak and Level */}
      <div className="flex gap-4 mb-5">
        <div className="fitness-card flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium mb-1 flex items-center">
                <CalendarDays size={16} className="mr-1 text-fitness-primary" />
                Current Streak
              </h4>
              <p className="text-2xl font-semibold">{user.stats.streak} days</p>
            </div>
            <ProgressRing 
              progress={streakProgress} 
              size={60} 
              color="var(--fitness-secondary, #FF6B6B)"
            >
              <span className="text-lg">🔥</span>
            </ProgressRing>
          </div>
        </div>
        
        <div className="fitness-card flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium mb-1 flex items-center">
                <Award size={16} className="mr-1 text-fitness-primary" />
                Level
              </h4>
              <p className="text-2xl font-semibold">{user.stats.level}</p>
            </div>
            <ProgressRing 
              progress={levelProgress} 
              size={60} 
              color="var(--fitness-accent, #7E57C2)"
            />
          </div>
        </div>
      </div>
      
      {/* Achievements Row */}
      <div className="fitness-card p-4">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium">Achievements</h4>
          <span className="text-xs text-fitness-primary font-medium">View all</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1">
          {/* This would be dynamic in the real app */}
          <div className="flex-shrink-0 w-12 h-12 bg-fitness-light rounded-full flex items-center justify-center">
            <span className="text-xl">🏆</span>
          </div>
          <div className="flex-shrink-0 w-12 h-12 bg-fitness-light rounded-full flex items-center justify-center">
            <span className="text-xl">🏃</span>
          </div>
          <div className="flex-shrink-0 w-12 h-12 bg-fitness-light rounded-full flex items-center justify-center">
            <span className="text-xl">🔥</span>
          </div>
          <div className="flex-shrink-0 w-12 h-12 bg-fitness-light rounded-full flex items-center justify-center">
            <span className="text-xl">⭐</span>
          </div>
          <div className="flex-shrink-0 w-12 h-12 bg-fitness-light rounded-full flex items-center justify-center">
            <span className="text-xl">🏋️</span>
          </div>
          <div className="flex-shrink-0 w-12 h-12 bg-fitness-light rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
            <span className="text-xl text-gray-300">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};
