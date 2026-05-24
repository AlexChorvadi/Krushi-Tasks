import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-50 py-8 mt-auto relative z-20">
      
      <style>
        {`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.10); }
            30% { transform: scale(1.20); }
            45% { transform: scale(1.10); }
            60% { transform: scale(1); }
          }
          .animate-heartbeat {
            animation: heartbeat 1.5s ease-in-out infinite;
          }

          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-smooth-text {
            background-size: 200% 200%;
            animation: gradient-shift 4s ease infinite;
          }
        `}
      </style>

      <div className="flex items-center justify-center gap-2 text-gray-400 text-sm md:text-base font-medium">
        <span>Created with</span>
        
        <svg 
          className="w-5 h-5 text-pink-500 animate-heartbeat drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        <span>by</span>
        
        <span className="relative group inline-block cursor-pointer px-1">
          <span className="animate-smooth-text bg-gradient-to-r from-slate-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-bold text-lg tracking-wide transition-all duration-300 group-hover:tracking-widest">
            Krushi
          </span>
          
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
        </span>
      </div>
    </footer>
  );
}