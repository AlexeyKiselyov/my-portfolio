import React from 'react';

interface ContactMenuProps {
  contact: any; // From DevConfig.contacts
  isContactsOpen: boolean;
  setContactsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFindMeOpen: boolean;
  setFindMeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactMenu: React.FC<ContactMenuProps> = ({
  contact,
  isContactsOpen,
  setContactsOpen,
  isFindMeOpen,
  setFindMeOpen,
}) => {
  return (
    <div id="page-menu" className="w-full h-full flex flex-col border-right">
      {/* Contacts */}
      <div id="contacts" className="submenu">
        <div
          className="title"
          onClick={() => setContactsOpen(prevState => !prevState)}
        >
          <img
            className="arrow"
            style={{
              transform: isContactsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
            src="/icons/arrow.svg"
            alt="Toggle Contacts"
          />
          <h3>contacts</h3>
        </div>
        <div id="links" style={{ display: isContactsOpen ? 'block' : 'none' }}>
          <div className="link">
            <img src="/icons/email.svg" alt="email" />
            <a
              href={`mailto:${contact.direct.sources.email}`}
              className="font-fira_retina text-menu-text hover:text-white max-w-full lg:max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap inline-block"
              title={contact.direct.sources.email}
            >
              {contact.direct.sources.email}
            </a>
          </div>
          <div className="link">
            <img src="/icons/phone.svg" alt="phone" />
            <a
              href={`tel:${contact.direct.sources.phone}`}
              className="font-fira_retina text-menu-text hover:text-white"
            >
              {contact.direct.sources.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Find Me Also In */}
      <div id="find-me-in" className="submenu border-top">
        <div className="title" onClick={() => setFindMeOpen(o => !o)}>
          <img
            className="arrow"
            style={{
              transform: isFindMeOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
            src="/icons/arrow.svg"
            alt="Toggle Find Me"
          />
          <h3>find-me-also-in</h3>
        </div>
        <div id="links" style={{ display: isFindMeOpen ? 'block' : 'none' }}>
          {Object.values(contact.find_me_also_in.sources).map(
            (source: any, index: number) => (
              <div key={index} className="link">
                <img src="/icons/link.svg" alt="Link" />
                <a
                  href={`${source.url}${source.user}`}
                  className="font-fira_retina text-menu-text hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.title}
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMenu;
