import { render, screen } from '@testing-library/react';
import AppFooter from '../components/AppFooter/AppFooter';

describe('AppFooter Component', () => {
  it('renders social links correctly', () => {
    render(<AppFooter />);

    expect(screen.getByText(/find me in:/i)).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('contains github link', () => {
    render(<AppFooter />);
    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    expect(githubLinks[0]).toHaveAttribute(
      'href',
      expect.stringContaining('github.com')
    );
  });
});
