import React from 'react';
import clsx from 'clsx';

import { useContactForm } from '../../../hooks/useContactForm';

import styles from './ContactForm.module.css';

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  name,
  email,
  message,
  onNameChange,
  onEmailChange,
  onMessageChange,
}) => {
  const {
    status,
    nameError,
    emailError,
    messageError,
    canSubmit,
    nameRef,
    emailRef,
    messageRef,
    markTouched,
    handleSubmit,
  } = useContactForm({
    name,
    email,
    message,
    onNameChange,
    onEmailChange,
    onMessageChange,
  });

  return (
    <form
      className={clsx('text-sm font-fira_retina text-menu-text', styles.form)}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="name-input" className="mb-3">
          _name:
        </label>
        <input
          type="text"
          id="name-input"
          name="name"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          onBlur={() => markTouched('name')}
          ref={nameRef}
          placeholder="Your name"
          className={clsx('p-2 mb-1 placeholder-slate-600', styles.control, {
            [styles.invalid]: !!nameError,
          })}
          aria-invalid={!!nameError}
          aria-describedby="name-error"
          required
        />
        {nameError && (
          <span id="name-error" className={styles.errorText} role="alert">
            {nameError}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="email-input" className="mb-3">
          _email:
        </label>
        <input
          type="email"
          id="email-input"
          name="email"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          onBlur={() => markTouched('email')}
          ref={emailRef}
          placeholder="name@example.com"
          className={clsx('p-2 mb-1 placeholder-slate-600', styles.control, {
            [styles.invalid]: !!emailError,
          })}
          aria-invalid={!!emailError}
          aria-describedby="email-error"
          required
        />
        {emailError && (
          <span id="email-error" className={styles.errorText} role="alert">
            {emailError}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="message-input" className="mb-3">
          _message:
        </label>
        <textarea
          id="message-input"
          name="message"
          value={message}
          onChange={e => onMessageChange(e.target.value)}
          onBlur={() => markTouched('message')}
          ref={messageRef}
          placeholder="Your message"
          className={clsx(
            'placeholder-slate-600',
            styles.control,
            styles.textarea,
            { [styles.invalid]: !!messageError }
          )}
          aria-invalid={!!messageError}
          aria-describedby="message-error"
          required
        ></textarea>
        {messageError && (
          <span id="message-error" className={styles.errorText} role="alert">
            {messageError}
          </span>
        )}
      </div>
      <button
        id="submit-button"
        type="submit"
        className={clsx(
          'button-main mt-5',
          (!canSubmit || status === 'sending') &&
            'opacity-60 cursor-not-allowed'
        )}
        aria-disabled={!canSubmit || status === 'sending'}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <span className={styles.sending}>
            sending
            <span className={styles.dots} aria-hidden="true">
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </span>
          </span>
        ) : (
          'submit-message'
        )}
      </button>
      {status === 'error' && (
        <p className={styles.errorText} role="status" aria-live="polite">
          Unable to send via Telegram. A mail client was opened as fallback.
        </p>
      )}
      {status === 'success' && (
        <div className={styles.toast} role="status" aria-live="polite">
          Message sent successfully.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
