import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Smooth follow for ring
      setTimeout(() => {
        setRingPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    // Delegação no document: também pega elementos que aparecem depois
    // (modal do WhatsApp, filmes vindos da API, "Mostrar mais").
    const INTERACTIVE = 'a, button, input, textarea, label, .portfolio-item, .service-card, .process-step';
    const handleMouseOver = (e) => {
      setIsActive(Boolean(e.target.closest?.(INTERACTIVE)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className="cursor" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      />
      <div 
        className={`cursor-ring ${isActive ? 'active' : ''}`}
        style={{ 
          left: `${ringPosition.x}px`, 
          top: `${ringPosition.y}px` 
        }}
      />
    </>
  );
};

export default CustomCursor;
