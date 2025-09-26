import React from 'react';
import type { DirectContactsBlock } from '../../../types/developer';

interface Props {
  contacts: DirectContactsBlock;
  inline?: boolean;
}

const ContactsBlock: React.FC<Props> = ({ contacts }) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <img src="/icons/email.svg" alt="email" className="mx-4" />
        <a
          href={`mailto:${contacts.sources.email}`}
          className="font-fira_retina text-menu-text hover:text-white max-w-full lg:max-w-[150px]  overflow-hidden text-ellipsis whitespace-nowrap inline-block"
          title={contacts.sources.email}
          rel="noopener noreferrer"
        >
          {contacts.sources.email}
        </a>
      </div>
      <div className="flex items-center mb-2">
        <img src="/icons/phone.svg" alt="phone" className="mx-4" />
        <a
          href={`tel:${contacts.sources.phone}`}
          className="font-fira_retina text-menu-text hover:text-white"
          rel="noopener noreferrer"
        >
          {contacts.sources.phone}
        </a>
      </div>
    </div>
  );
};

export default ContactsBlock;
