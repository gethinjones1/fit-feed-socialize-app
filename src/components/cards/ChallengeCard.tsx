
import React from 'react';
import { Challenge } from '../../types/models';
import { Trophy, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ChallengeCardProps {
  challenge: Challenge;
  currentUserId: string;
  className?: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ 
  challenge, 
  currentUserId,
  className = '' 
}) => {
  // Find current user's progress in the challenge
  const userProgress = challenge.progress.find(p => p.userId === currentUserId);
  const progressPercentage = userProgress 
    ? Math.min((userProgress.progress / challenge.goal) * 100, 100) 
    : 0;
  
  // Format dates
  const startDate = format(new Date(challenge.startDate), 'MMM d');
  const endDate = format(new Date(challenge.endDate), 'MMM d');

  return (
    <div className={`fitness-card ${challenge.featured ? 'border-fitness-primary border-2' : ''} ${className}`}>
      {challenge.featured && (
        <div className="flex items-center mb-3 -mt-1 text-fitness-primary">
          <Trophy size={16} className="mr-1" />
          <span className="text-xs font-medium">Featured Challenge</span>
        </div>
      )}
      
      <h3 className="text-lg font-semibold mb-1">{challenge.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
      
      {/* Challenge details */}
      <div className="flex gap-2 text-xs mb-4">
        <div className="flex items-center text-fitness-muted">
          <Calendar size={14} className="mr-1" />
          <span>{startDate} - {endDate}</span>
        </div>
        <div className="flex items-center text-fitness-muted">
          <Users size={14} className="mr-1" />
          <span>{challenge.participants.length} participants</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium">Your progress</span>
          <span>
            {userProgress?.progress || 0} / {challenge.goal} {challenge.unit}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-fitness-primary rounded-full animate-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Participants */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {challenge.participants.slice(0, 3).map((participant, index) => (
            <img 
              key={index}
              src={participant.profileImage} 
              alt={participant.name} 
              className="w-7 h-7 rounded-full border-2 border-white object-cover"
            />
          ))}
          {challenge.participants.length > 3 && (
            <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
              +{challenge.participants.length - 3}
            </div>
          )}
        </div>
        
        <button className="text-xs font-medium text-fitness-primary hover:text-fitness-primary/80 transition-colors">
          View Challenge
        </button>
      </div>
    </div>
  );
};
