
import { useState } from 'react';
import { Home, BarChart, Plus, Trophy, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Navigation items
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart, label: 'Feed', path: '/feed' },
    { icon: Plus, label: 'Log', path: '/activity/new', isAction: true },
    { icon: Trophy, label: 'Challenges', path: '/challenges' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="bottom-nav animate-slide-in-bottom">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`nav-item ${pathname === item.path ? 'active' : ''} ${
            item.isAction ? 'relative' : ''
          }`}
        >
          {item.isAction ? (
            <div className="absolute -top-6 bg-fitness-secondary text-white p-3 rounded-full shadow-lg">
              <item.icon size={24} />
            </div>
          ) : (
            <item.icon size={20} />
          )}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
