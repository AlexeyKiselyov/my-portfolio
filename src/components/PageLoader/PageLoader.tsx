import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-menu-bg text-menu-text z-50">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-2 border-menu-text border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-sm font-fira_regular">Loading...</span>
      </div>
    </div>
  );
};

export default PageLoader;
