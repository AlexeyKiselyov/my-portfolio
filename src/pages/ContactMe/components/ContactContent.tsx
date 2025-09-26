import React from 'react';
import clsx from 'clsx';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import ContactForm from './ContactForm';
import FormContentCode from './FormContentCode';

interface ContactContentProps {
  name: string;
  email: string;
  message: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  animation: boolean;
  leftSBRef: (instance: any) => void;
  rightSBRef: (instance: any) => void;
}

const ContactContent: React.FC<ContactContentProps> = ({
  name,
  email,
  message,
  onNameChange,
  onEmailChange,
  onMessageChange,
  animation,
  leftSBRef,
  rightSBRef,
}) => {
  return (
    <div className="flex flex-col w-full h-full min-h-0">
      {/* Main Section */}
      <div className="flex lg:grid lg:grid-cols-2 flex-1 w-full min-h-0">
        {/* Left Section */}
        <div
          id="left"
          className="h-full w-full min-h-0 min-w-0 flex flex-col border-right items-center overflow-hidden"
        >
          <SimpleBar
            ref={leftSBRef}
            className="w-full h-full max-h-full scroll-bar"
            autoHide={false}
          >
            <div
              className={clsx(
                'w-full box-border pr-8 flex justify-center',
                animation ? 'fadeIn' : 'animHidden'
              )}
            >
              <ContactForm
                name={name}
                email={email}
                message={message}
                onNameChange={onNameChange}
                onEmailChange={onEmailChange}
                onMessageChange={onMessageChange}
              />
            </div>
          </SimpleBar>
        </div>

        {/* Right Section */}
        <div
          id="right"
          className={clsx(
            'h-full w-full min-h-0 min-w-0 hidden lg:flex overflow-hidden',
            animation ? 'fadeIn' : 'animHidden'
          )}
        >
          <SimpleBar
            ref={rightSBRef}
            className="w-full h-full max-h-full scroll-bar"
            autoHide={false}
          >
            <div className="form-content-inner">
              <FormContentCode name={name} email={email} message={message} />
            </div>
          </SimpleBar>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
