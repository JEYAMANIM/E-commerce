import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const DealCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2 py-0.5 rounded text-[11px] font-bold border border-rose-200">
      <Clock className="w-3 h-3 text-rose-600 animate-pulse" />
      <span>
        Ends in {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
      </span>
    </div>
  );
};
