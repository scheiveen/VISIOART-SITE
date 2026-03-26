import React from 'react';
import { marqueeText } from '../data/mock';
import './Marquee.css';

const Marquee = () => {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {/* Duplicate for seamless loop */}
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {marqueeText.map((text, index) => (
              <React.Fragment key={`${i}-${index}`}>
                <span className="marquee-item">{text}</span>
                <span className="marquee-sep">•</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
