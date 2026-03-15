import React from 'react';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="loading-logo">BACK ALLEY BOYZ™</h1>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <p className="loading-text">SAIGON WORLDWIDE — EST 2024</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
