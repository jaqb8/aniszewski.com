import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

// Tests for main App component

describe('App', () => {
  it('renders navigation links', () => {
    render(<App />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows hero image and resume link', () => {
    render(<App />);
    const img = screen.getByAltText('Jakub Aniszewski');
    expect(img).toBeInTheDocument();
    const resumeLink = screen.getByText('Download my Resume!');
    expect(resumeLink).toHaveAttribute('href', expect.stringContaining('resume'));
  });

  it('opens and closes mobile sidebar', () => {
    render(<App />);
    const toggle = screen.getByRole('button');
    // Initially only header links should be visible
    expect(screen.getAllByText('About')).toHaveLength(1);
    fireEvent.click(toggle);
    expect(screen.getAllByText('About').length).toBeGreaterThan(1);
    // Click a sidebar link to close
    const links = screen.getAllByText('About');
    fireEvent.click(links[1]);
    expect(screen.getAllByText('About')).toHaveLength(1);
  });

  it('displays contact email link', () => {
    render(<App />);
    const email = screen.getByText('Email');
    expect(email.closest('a')).toHaveAttribute('href', expect.stringContaining('mailto:'));
  });
});
