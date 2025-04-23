
import React from 'react';
import { Activity, ActivityType } from '../../types/models';
import { Heart, MessageSquare, Clock, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Activity type icons mapping
const activityIcons: Record<ActivityType, string> = {
  [ActivityType.RUN]: '🏃',
  [ActivityType.WALK]: '🚶',
  [ActivityType.CYCLE]: '🚴',
  [ActivityType.SWIM]: '🏊',
  [ActivityType.GYM]: '💪',
  [ActivityType.YOGA]: '🧘',
  [ActivityType.HIIT]: '⚡',
  [ActivityType.OTHER]: '⭐',
};

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, className = '' }) => {
  // Format the date to relative time (e.g., "2 days ago")
  const timeAgo = formatDistanceToNow(new Date(activity.date), { addSuffix: true });

  return (
    <div className={`fitness-card mb-4 overflow-hidden animate-fade-in ${className}`}>
      {/* User info and timestamp */}
      <div className="flex items-center mb-3">
        <img 
          src={activity.user.profileImage} 
          alt={activity.user.name} 
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div className="flex-1">
          <h4 className="font-medium text-fitness-dark">{activity.user.name}</h4>
          <p className="text-xs text-fitness-muted flex items-center">
            {timeAgo}
            {activity.location && (
              <>
                <span className="mx-1">•</span>
                <MapPin size={12} className="inline mr-1" />
                {activity.location}
              </>
            )}
          </p>
        </div>
        <div className="text-xl">{activityIcons[activity.type]}</div>
      </div>
      
      {/* Activity title and description */}
      <h3 className="font-semibold text-lg mb-1">{activity.title}</h3>
      {activity.description && (
        <p className="text-gray-600 mb-3">{activity.description}</p>
      )}
      
      {/* Activity image if available */}
      {activity.image && (
        <div className="rounded-xl overflow-hidden mb-3 -mx-1">
          <img 
            src={activity.image} 
            alt={activity.title} 
            className="w-full h-52 object-cover"
          />
        </div>
      )}
      
      {/* Activity stats */}
      <div className="flex gap-3 mb-3">
        {activity.distance && (
          <div className="bg-fitness-light rounded-lg px-3 py-2 flex-1">
            <p className="text-xs text-fitness-muted">Distance</p>
            <p className="font-semibold">{activity.distance} km</p>
          </div>
        )}
        
        <div className="bg-fitness-light rounded-lg px-3 py-2 flex-1">
          <p className="text-xs text-fitness-muted">Duration</p>
          <p className="font-semibold flex items-center">
            <Clock size={14} className="mr-1" />
            {activity.duration} min
          </p>
        </div>
        
        {activity.mood && (
          <div className="bg-fitness-light rounded-lg px-3 py-2 flex-1">
            <p className="text-xs text-fitness-muted">Feeling</p>
            <p className="font-semibold capitalize">{activity.mood}</p>
          </div>
        )}
      </div>
      
      {/* Engagement stats */}
      <div className="flex border-t border-gray-100 pt-3 mt-1">
        <button className="flex items-center mr-4 text-fitness-muted hover:text-fitness-secondary transition-colors">
          <Heart size={18} className="mr-1" />
          <span>{activity.likes}</span>
        </button>
        <button className="flex items-center text-fitness-muted hover:text-fitness-primary transition-colors">
          <MessageSquare size={18} className="mr-1" />
          <span>{activity.comments}</span>
        </button>
      </div>
    </div>
  );
};
