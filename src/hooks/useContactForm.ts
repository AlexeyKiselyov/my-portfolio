import { useMemo, useRef, useState } from 'react';
import { TELEGRAM_ENDPOINT } from '../constants';
import { validateName, validateEmail, validateMessage } from '../utils';
import analytics from '../utils/analytics';

interface UseContactFormProps {
  name: string;
  email: string;
  message: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
}

export const useContactForm = ({
  name,
  email,
  message,
  onNameChange,
  onEmailChange,
  onMessageChange,
}: UseContactFormProps) => {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  const markTouched = (field: 'name' | 'email' | 'message') =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  // Check if form can be submitted
  const canSubmit = useMemo(() => {
    return (
      validateName(name) && validateEmail(email) && validateMessage(message)
    );
  }, [name, email, message]);

  // Error messages for fields
  const nameError =
    touched.name && !validateName(name)
      ? 'Enter your name (min 2 characters)'
      : '';
  const emailError =
    touched.email && !validateEmail(email) ? 'Enter a valid email address' : '';
  const messageError =
    touched.message && !validateMessage(message)
      ? 'Enter a message (min 4 characters)'
      : '';

  // Focus the first invalid field
  const focusFirstInvalidField = () => {
    if (!validateName(name)) {
      nameRef.current?.focus();
    } else if (!validateEmail(email)) {
      emailRef.current?.focus();
    } else if (!validateMessage(message)) {
      messageRef.current?.focus();
    }
  };

  // Send message via Telegram or fallback to mailto
  const sendMessage = async () => {
    setStatus('sending');
    analytics.contact.formStart();
    try {
      const resp = await fetch(TELEGRAM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await resp.json().catch(() => ({} as any));
      if (!resp.ok || (json && json.ok === false)) {
        throw new Error(
          json && json.error ? json.error : `status_${resp.status}`
        );
      }
      // Success: clear fields and show toast
      setTouched({});
      onNameChange('');
      onEmailChange('');
      onMessageChange('');
      setStatus('success');
      analytics.contact.formSubmit(true);
      setTimeout(() => setStatus('idle'), 2500);
    } catch (e) {
      // fallback to mailto
      const subject = encodeURIComponent('Portfolio contact form');
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      );
      const to =
        (import.meta.env.VITE_CONTACT_EMAIL as string) ||
        'aleshakiselev123@gmail.com';
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      setStatus('error');
      analytics.contact.formError('telegram_failed');
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      setTouched({ name: true, email: true, message: true });
      focusFirstInvalidField();
      return;
    }
    await sendMessage();
  };

  return {
    status,
    touched,
    nameError,
    emailError,
    messageError,
    canSubmit,
    nameRef,
    emailRef,
    messageRef,
    markTouched,
    handleSubmit,
  };
};
