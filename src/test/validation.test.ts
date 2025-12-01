import { validateEmail } from '../utils/validationUtils';

describe('Validation Utils', () => {
  it('validates correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('rejects incorrect email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});
