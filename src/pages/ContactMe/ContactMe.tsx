import React, { useEffect, useState } from 'react';

import useMedia from '../../hooks/useMedia';
import useSmoothScroll from '../../hooks/useSmoothScroll';

import ContactMenu from './components/ContactMenu';
import ContactTabs from './components/ContactTabs';
import ContactContent from './components/ContactContent';
import SEO from '../../components/SEO';

import './ContactMe.css';

import DevConfig from '../../developer.json';

const ContactMe: React.FC = () => {
  const contact = DevConfig.contacts;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isContactsOpen, setContactsOpen] = useState<boolean>(true);
  const [isFindMeOpen, setFindMeOpen] = useState<boolean>(true);
  const [animation, setAnimation] = useState(false);

  const isDesktop = useMedia('(min-width: 1024px)');

  const leftSBRef = useSmoothScroll({
    enabled: isDesktop,
    lerp: 0.1,
    duration: 1.2,
  });

  const rightSBRef = useSmoothScroll({
    enabled: isDesktop,
    lerp: 0.1,
    duration: 1.2,
  });

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <>
      <SEO page="contact" canonical={`${window.location.origin}/contact-me`} />
      <main id="contact-me" className="page">
        {/* Mobile Page Title */}
        <div id="mobile-page-title">
          <h2>_contact-me</h2>
        </div>

        <ContactMenu
          contact={contact}
          isContactsOpen={isContactsOpen}
          setContactsOpen={setContactsOpen}
          isFindMeOpen={isFindMeOpen}
          setFindMeOpen={setFindMeOpen}
        />

        {/* Main Content */}
        <div className="flex flex-col w-full h-full min-h-0">
          <ContactTabs />

          <ContactContent
            name={name}
            email={email}
            message={message}
            onNameChange={setName}
            onEmailChange={setEmail}
            onMessageChange={setMessage}
            animation={animation}
            leftSBRef={leftSBRef}
            rightSBRef={rightSBRef}
          />
        </div>
      </main>
    </>
  );
};

export default ContactMe;
