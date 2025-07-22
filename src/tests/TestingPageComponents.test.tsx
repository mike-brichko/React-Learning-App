import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../store';
import { TestableCounter, UserForm, AsyncDataComponent } from '../pages/TestingPage';

// Mock setup for testing
const MockedWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
};

describe('TestableCounter', () => {
  test('renders with default initial value of 0', () => {
    render(<TestableCounter />, { wrapper: MockedWrapper });
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
  });

  test('renders with custom initial value', () => {
    render(<TestableCounter initialValue={5} />, { wrapper: MockedWrapper });
    expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
  });

  test('increments count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestableCounter />, { wrapper: MockedWrapper });
    
    const incrementButton = screen.getByTestId('increment-button');
    await user.click(incrementButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
  });

  test('decrements count when decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestableCounter initialValue={5} />, { wrapper: MockedWrapper });
    
    const decrementButton = screen.getByTestId('decrement-button');
    await user.click(decrementButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('4');
  });

  test('resets count to initial value when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestableCounter initialValue={3} />, { wrapper: MockedWrapper });
    
    // Increment a few times
    const incrementButton = screen.getByTestId('increment-button');
    await user.click(incrementButton);
    await user.click(incrementButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
    
    // Reset
    const resetButton = screen.getByTestId('reset-button');
    await user.click(resetButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('3');
  });

  test('calls onCountChange callback when count changes', async () => {
    const user = userEvent.setup();
    const mockOnCountChange = vi.fn();
    
    render(
      <TestableCounter onCountChange={mockOnCountChange} />,
      { wrapper: MockedWrapper }
    );
    
    const incrementButton = screen.getByTestId('increment-button');
    await user.click(incrementButton);
    
    expect(mockOnCountChange).toHaveBeenCalledWith(1);
  });
});

describe('UserForm', () => {
  const fillForm = async (user: any, formData: {
    name: string;
    email: string;
    age: string;
    role: string;
    newsletter?: boolean;
  }) => {
    await user.clear(screen.getByTestId('name-input'));
    await user.type(screen.getByTestId('name-input'), formData.name);
    
    await user.clear(screen.getByTestId('email-input'));
    await user.type(screen.getByTestId('email-input'), formData.email);
    
    await user.clear(screen.getByTestId('age-input'));
    await user.type(screen.getByTestId('age-input'), formData.age);
    
    await user.click(screen.getByTestId('role-select'));
    await user.click(screen.getByRole('option', { name: formData.role }));
    
    if (formData.newsletter) {
      await user.click(screen.getByTestId('newsletter-checkbox'));
    }
  };

  test('renders all form fields', () => {
    render(<UserForm />, { wrapper: MockedWrapper });
    
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('age-input')).toBeInTheDocument();
    expect(screen.getByTestId('role-select')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();
    
    render(<UserForm onSubmit={mockOnSubmit} />, { wrapper: MockedWrapper });
    
    await fillForm(user, {
      name: 'John Doe',
      email: 'john@example.com',
      age: '25',
      role: 'Developer',
      newsletter: true,
    });
    
    await user.click(screen.getByTestId('submit-button'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
      role: 'developer',
      newsletter: true,
    });
  });

  test('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<UserForm />, { wrapper: MockedWrapper });
    
    await user.click(screen.getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('form-errors')).toBeInTheDocument();
    });
    
    const errorMessages = screen.getByTestId('form-errors');
    expect(errorMessages).toHaveTextContent('Name is required');
    expect(errorMessages).toHaveTextContent('Email is required');
    expect(errorMessages).toHaveTextContent('Age must be a valid number');
    expect(errorMessages).toHaveTextContent('Role is required');
  });

  test('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<UserForm />, { wrapper: MockedWrapper });
    
    await fillForm(user, {
      name: 'John Doe',
      email: 'invalid-email',
      age: '25',
      role: 'Developer',
    });
    
    await user.click(screen.getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('form-errors')).toBeInTheDocument();
    });
    
    expect(screen.getByTestId('form-errors')).toHaveTextContent('Email must be valid');
  });

  test('clears form after successful submission', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();
    
    render(<UserForm onSubmit={mockOnSubmit} />, { wrapper: MockedWrapper });
    
    await fillForm(user, {
      name: 'John Doe',
      email: 'john@example.com',
      age: '25',
      role: 'Developer',
    });
    
    await user.click(screen.getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
    
    // Check that form fields are cleared
    expect(screen.getByTestId('name-input')).toHaveValue('');
    expect(screen.getByTestId('email-input')).toHaveValue('');
    expect(screen.getByTestId('age-input')).toHaveValue('');
  });
});

describe('AsyncDataComponent', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  test('renders fetch button initially', () => {
    render(<AsyncDataComponent />, { wrapper: MockedWrapper });
    expect(screen.getByTestId('fetch-button')).toBeInTheDocument();
  });

  test('shows loading state when fetching data', async () => {
    const user = userEvent.setup();
    render(<AsyncDataComponent delay={100} />, { wrapper: MockedWrapper });
    
    await user.click(screen.getByTestId('fetch-button'));
    
    expect(screen.getByTestId('loading-message')).toBeInTheDocument();
    expect(screen.getByTestId('fetch-button')).toBeDisabled();
  });

  test('shows success message after successful fetch', async () => {
    const user = userEvent.setup();
    
    // Mock Math.random to always return > 0.3 (success case)
    const originalRandom = Math.random;
    Math.random = vi.fn(() => 0.5);
    
    render(<AsyncDataComponent delay={50} />, { wrapper: MockedWrapper });
    
    await user.click(screen.getByTestId('fetch-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    }, { timeout: 1000 });
    
    // Restore original Math.random
    Math.random = originalRandom;
  });

  test('shows error message after failed fetch', async () => {
    const user = userEvent.setup();
    
    // Mock Math.random to always return <= 0.3 (error case)
    const originalRandom = Math.random;
    Math.random = vi.fn(() => 0.2);
    
    render(<AsyncDataComponent delay={50} />, { wrapper: MockedWrapper });
    
    await user.click(screen.getByTestId('fetch-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    }, { timeout: 1000 });
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch data');
    
    // Restore original Math.random
    Math.random = originalRandom;
  });

  test('can fetch data multiple times', async () => {
    const user = userEvent.setup();
    
    // Mock Math.random to always succeed
    const originalRandom = Math.random;
    Math.random = vi.fn(() => 0.5);
    
    render(<AsyncDataComponent delay={10} />, { wrapper: MockedWrapper });
    
    // First fetch
    await user.click(screen.getByTestId('fetch-button'));
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
    
    // Second fetch
    await user.click(screen.getByTestId('fetch-button'));
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
    
    // Restore original Math.random
    Math.random = originalRandom;
  });
});

// Integration test example
describe('Form Integration', () => {
  test('counter and form work together', async () => {
    const user = userEvent.setup();
    const mockCounterChange = vi.fn();
    const mockFormSubmit = vi.fn();
    
    render(
      <div>
        <TestableCounter onCountChange={mockCounterChange} />
        <UserForm onSubmit={mockFormSubmit} />
      </div>,
      { wrapper: MockedWrapper }
    );
    
    // Interact with counter
    await user.click(screen.getByTestId('increment-button'));
    expect(mockCounterChange).toHaveBeenCalledWith(1);
    
    // Fill and submit form
    await user.type(screen.getByTestId('name-input'), 'Test User');
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('age-input'), '30');
    await user.click(screen.getByTestId('role-select'));
    await user.click(screen.getByRole('option', { name: 'Developer' }));
    await user.click(screen.getByTestId('submit-button'));
    
    expect(mockFormSubmit).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      age: 30,
      role: 'developer',
      newsletter: false,
    });
  });
});
