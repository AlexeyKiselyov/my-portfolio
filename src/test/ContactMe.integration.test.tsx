import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactMe from '../pages/ContactMe/ContactMe';

// 1. Mock SimpleBar as it doesn't work well in JSDOM
vi.mock('simplebar-react', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// 2. Mock useMedia to emulate desktop (where the form is visible)
vi.mock('../hooks/useMedia', () => ({
  default: () => true, // isDesktop = true
}));

// 3. Mock fetch globally
window.fetch = vi.fn();

describe('ContactMe Integration Test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('allows user to fill and submit the contact form', async () => {
    // Setup fetch mock for successful response
    (window.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    render(
      <MemoryRouter>
        <ContactMe />
      </MemoryRouter>
    );

    // Find input fields
    const nameInput = screen.getByLabelText(/_name:/i);
    const emailInput = screen.getByLabelText(/_email:/i);
    const messageInput = screen.getByLabelText(/_message:/i);

    // Fill the form
    fireEvent.change(nameInput, { target: { value: 'Integration User' } });
    fireEvent.change(emailInput, { target: { value: 'test@integration.com' } });
    fireEvent.change(messageInput, {
      target: { value: 'Form integration test!' },
    });

    // Check that values updated (React state works)
    expect(nameInput).toHaveValue('Integration User');
    expect(emailInput).toHaveValue('test@integration.com');

    // Find submit button
    const submitBtn = screen.getByRole('button', { name: /submit-message/i });

    // Click
    fireEvent.click(submitBtn);

    // Check that fetch was called with correct data
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        expect.stringContaining('telegram'), // Check that URL contains telegram (from constants)
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'Integration User',
            email: 'test@integration.com',
            message: 'Form integration test!',
          }),
        })
      );
    });

    // Check for success message appearance
    await waitFor(() => {
      expect(
        screen.getByText(/Message sent successfully/i)
      ).toBeInTheDocument();
    });
  });
});
