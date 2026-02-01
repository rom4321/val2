
import React, { useEffect, useState } from 'react';
import { HeartIcon } from '../constants';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * (40 - 10) + 10,
      duration: Math.random() * (15 - 5) + 5,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-pink-50 to-red-50">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle text-pink-300 opacity-60"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <HeartIcon />
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;
