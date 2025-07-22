import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { BrowserRouter } from 'react-router-dom';

// Mock the Material-UI theme provider
const MockedThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(
      <MockedThemeProvider>
        <HomePage />
      </MockedThemeProvider>
    );
    
    expect(screen.getByText('React Learning Playground')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(
      <MockedThemeProvider>
        <HomePage />
      </MockedThemeProvider>
    );
    
    expect(screen.getByText('React Hooks')).toBeInTheDocument();
    expect(screen.getByText('Redux Toolkit')).toBeInTheDocument();
    expect(screen.getByText('TanStack React Query')).toBeInTheDocument();
  });
});
