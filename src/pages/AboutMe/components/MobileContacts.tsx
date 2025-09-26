import React from 'react';
import clsx from 'clsx';
import ContactsBlock from './ContactsBlock';
import type { DeveloperConfig as Config } from '../../../types/developer';

interface MobileContactsProps {
  contactsData: Config['contacts']['direct'];
  isOpen: boolean;
  onToggle: () => void;
}

const MobileContacts: React.FC<MobileContactsProps> = ({
  contactsData,
  isOpen,
  onToggle,
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        id="section-content-title"
        className="flex items-center min-w-full"
        aria-expanded={isOpen}
      >
        <img
          src="/icons/arrow.svg"
          alt="toggle contacts"
          className={clsx('section-arrow', { 'rotate-90': isOpen })}
        />
        <span className="font-fira_regular text-white text-sm ml-1">
          {contactsData.title}
        </span>
      </button>
      {isOpen && (
        <div className="my-2 px-6">
          <ContactsBlock contacts={contactsData} />
        </div>
      )}
    </div>
  );
};

export default MobileContacts;
