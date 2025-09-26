import React from 'react';

const ContactTabs: React.FC = () => {
  return (
    <div className="tab-height w-full hidden lg:flex border-right border-bot items-center">
      <div className="flex items-center border-right h-full">
        <p className="font-fira_regular text-menu-text text-sm px-3">
          contacts
        </p>
        <img src="/icons/close.svg" alt="Close" className="m-3" />
      </div>
    </div>
  );
};

export default ContactTabs;
