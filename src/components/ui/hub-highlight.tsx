
import React from 'react';

interface HubHighlightProps {
  className?: string;
}

const HubHighlight: React.FC<HubHighlightProps> = ({ className = "" }) => {
  return (
    <span 
      className={`
        inline-block 
        text-transparent 
        bg-gradient-to-r 
        from-purple-500 
        via-blue-500 
        to-cyan-400 
        bg-clip-text 
        font-bold 
        relative
        ${className}
      `}
      style={{
        textShadow: '0 0 10px rgba(147, 51, 234, 0.5)',
        filter: 'brightness(1.2)',
      }}
    >
      Hub
    </span>
  );
};

export default HubHighlight;
