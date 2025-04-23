
// User model
export interface User {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  bio?: string;
  followers: number;
  following: number;
  joinDate: string;
  stats: UserStats;
}

// User statistics
export interface UserStats {
  totalActivities: number;
  totalDistance: number; // in km
  totalDuration: number; // in minutes
  achievements: number;
  streak: number;
  level: number;
}

// Activity model
export interface Activity {
  id: string;
  userId: string;
  user: User;
  type: ActivityType;
  title: string;
  description?: string;
  distance?: number; // in km
  duration: number; // in minutes
  date: string;
  image?: string;
  likes: number;
  comments: number;
  location?: string;
  mood?: Mood;
}

// Challenge model
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  goal: number;
  unit: 'km' | 'minutes' | 'activities';
  startDate: string;
  endDate: string;
  participants: User[];
  progress: ChallengeProgress[];
  createdBy: string;
  featured?: boolean;
}

// Challenge progress
export interface ChallengeProgress {
  userId: string;
  progress: number;
  completed: boolean;
}

// Activity types
export enum ActivityType {
  RUN = 'run',
  WALK = 'walk',
  CYCLE = 'cycle',
  SWIM = 'swim',
  GYM = 'gym',
  YOGA = 'yoga',
  HIIT = 'hiit',
  OTHER = 'other',
}

// Challenge types
export enum ChallengeType {
  DISTANCE = 'distance',
  DURATION = 'duration',
  FREQUENCY = 'frequency',
}

// Mood types
export enum Mood {
  GREAT = 'great',
  GOOD = 'good',
  OKAY = 'okay',
  TIRED = 'tired',
  EXHAUSTED = 'exhausted',
}
