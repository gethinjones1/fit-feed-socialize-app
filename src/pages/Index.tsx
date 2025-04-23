
import { useState } from 'react';
import { BottomNav } from '../components/layout/BottomNav';
import { DailyMotivation } from '../components/shared/DailyMotivation';
import { ActivityCard } from '../components/cards/ActivityCard';
import { ChallengeCard } from '../components/cards/ChallengeCard';
import { ProgressRing } from '../components/ui/ProgressRing';
import { currentUser, mockActivities, mockChallenges } from '../data/mockData';
import { Bell, ChevronRight } from 'lucide-react';

const Index = () => {
  // Today's goals progress
  const stepsGoal = 10000;
  const currentSteps = 7350;
  const stepsProgress = (currentSteps / stepsGoal) * 100;
  
  // Get recent activities from mock data
  const recentActivities = mockActivities.slice(0, 2);
  
  // Get active challenges
  const activeChallenges = mockChallenges.filter(challenge => {
    const challengeEnd = new Date(challenge.endDate);
    return challengeEnd > new Date();
  });

  return (
    <div className="app-container pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div>
          <p className="text-fitness-muted text-sm">Welcome back</p>
          <h1 className="text-xl font-semibold">{currentUser.name}</h1>
        </div>
        <button className="p-2 relative">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-fitness-secondary rounded-full"></span>
        </button>
      </header>
      
      {/* Daily Motivation */}
      <div className="px-4">
        <DailyMotivation />
      </div>
      
      {/* Today's Progress */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Today's Progress</h2>
          <button className="text-sm text-fitness-muted flex items-center">
            See all
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="fitness-card flex items-center p-3">
            <ProgressRing 
              progress={stepsProgress} 
              size={60} 
              showPercentage={false}
              className="mr-3"
            >
              <span className="text-xs">👣</span>
            </ProgressRing>
            <div>
              <p className="text-xs text-fitness-muted">Steps</p>
              <p className="font-semibold">{currentSteps.toLocaleString()}</p>
              <p className="text-xs text-fitness-muted">Goal: {stepsGoal.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="fitness-card p-3 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xl">💪</span>
              <span className="text-xs text-white bg-fitness-accent px-2 py-0.5 rounded-full">Active</span>
            </div>
            <h3 className="font-medium text-sm">Weekly Challenge</h3>
            <p className="text-xs text-fitness-muted">2 days remaining</p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="flex gap-2 px-4 mb-6 overflow-x-auto pb-1">
        <button className="fitness-btn fitness-btn-primary px-6 py-2.5 flex-shrink-0">
          Log Activity
        </button>
        <button className="fitness-btn bg-fitness-light text-fitness-dark hover:bg-fitness-light/80 px-6 py-2.5 flex-shrink-0">
          Join Challenge
        </button>
        <button className="fitness-btn bg-fitness-light text-fitness-dark hover:bg-fitness-light/80 px-6 py-2.5 flex-shrink-0">
          Find Friends
        </button>
      </div>
      
      {/* Active Challenges */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Active Challenges</h2>
          <button className="text-sm text-fitness-muted flex items-center">
            See all
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          {activeChallenges.slice(0, 2).map(challenge => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge} 
              currentUserId={currentUser.id} 
            />
          ))}
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Recent Activities</h2>
          <button className="text-sm text-fitness-muted flex items-center">
            See all
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          {recentActivities.map(activity => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
            />
          ))}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
