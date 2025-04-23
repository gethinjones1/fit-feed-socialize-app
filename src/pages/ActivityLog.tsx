
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ActivityType, Mood } from '../types/models';
import { ArrowLeft, Camera, MapPin, Clock, Calendar, Plus, AlertCircle, Smile } from 'lucide-react';

const ActivityLog = () => {
  const [activityType, setActivityType] = useState<ActivityType>(ActivityType.RUN);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // Activity type options
  const activityTypes = [
    { type: ActivityType.RUN, emoji: '🏃' },
    { type: ActivityType.WALK, emoji: '🚶' },
    { type: ActivityType.CYCLE, emoji: '🚴' },
    { type: ActivityType.SWIM, emoji: '🏊' },
    { type: ActivityType.GYM, emoji: '💪' },
    { type: ActivityType.YOGA, emoji: '🧘' },
    { type: ActivityType.HIIT, emoji: '⚡' },
    { type: ActivityType.OTHER, emoji: '⭐' },
  ];

  // Mood options
  const moodOptions = [
    { type: Mood.GREAT, emoji: '😁', label: 'Great' },
    { type: Mood.GOOD, emoji: '🙂', label: 'Good' },
    { type: Mood.OKAY, emoji: '😐', label: 'Okay' },
    { type: Mood.TIRED, emoji: '😓', label: 'Tired' },
    { type: Mood.EXHAUSTED, emoji: '😩', label: 'Exhausted' },
  ];

  const handleSaveActivity = () => {
    // In a real app, this would save to backend
    console.log({
      activityType,
      title,
      description,
      distance: parseFloat(distance),
      duration: parseInt(duration),
      mood,
      image,
      date: new Date().toISOString(),
    });

    // Redirect to home
    window.location.href = '/';
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-100">
        <Link to="/" className="p-1">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-lg font-semibold">Log Activity</h1>
        <div className="w-5"></div> {/* Empty div for alignment */}
      </header>
      
      <div className="p-4">
        {/* Activity Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
          <div className="grid grid-cols-4 gap-2">
            {activityTypes.map((activity) => (
              <button
                key={activity.type}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-colors ${
                  activityType === activity.type
                    ? 'bg-fitness-primary/10 border-2 border-fitness-primary'
                    : 'bg-fitness-light border-2 border-transparent'
                }`}
                onClick={() => setActivityType(activity.type)}
              >
                <span className="text-2xl">{activity.emoji}</span>
                <span className="text-xs mt-1 capitalize">{activity.type}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g., Morning Run"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-fitness-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description (optional)
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="How was your activity?"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-fitness-primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        
        {/* Distance and Duration */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
              Distance (km)
            </label>
            <div className="relative">
              <input
                type="number"
                id="distance"
                placeholder="0.0"
                className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-fitness-primary"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fitness-muted">
                km
              </span>
            </div>
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duration (min)
            </label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fitness-muted" />
              <input
                type="number"
                id="duration"
                placeholder="0"
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-fitness-primary"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fitness-muted">
                min
              </span>
            </div>
          </div>
        </div>
        
        {/* Mood Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Smile size={16} className="inline mr-1" />
            How did you feel?
          </label>
          <div className="flex justify-between">
            {moodOptions.map((option) => (
              <button
                key={option.type}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  mood === option.type
                    ? 'bg-fitness-primary/10 text-fitness-primary'
                    : 'hover:bg-fitness-light'
                }`}
                onClick={() => setMood(option.type)}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-xs mt-1">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Add Photo */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photo (optional)
          </label>
          <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Camera size={24} className="text-fitness-muted mb-2" />
            <span className="text-sm text-fitness-muted">Tap to add photo</span>
          </button>
        </div>
        
        {/* Save Button */}
        <button 
          className="w-full fitness-btn fitness-btn-primary py-3 text-center font-medium"
          onClick={handleSaveActivity}
        >
          Save Activity
        </button>
        
        <div className="text-center mt-4 text-fitness-muted text-xs">
          <AlertCircle size={12} className="inline mr-1" />
          This is a demo app. Your activity won't be saved.
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
