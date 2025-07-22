import React, { useState, useCallback } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Container,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

// Example components to test
interface CounterProps {
  initialValue?: number;
  onCountChange?: (count: number) => void;
}

export const TestableCounter: React.FC<CounterProps> = ({ initialValue = 0, onCountChange }) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  }, [count, onCountChange]);

  const decrement = useCallback(() => {
    const newCount = count - 1;
    setCount(newCount);
    onCountChange?.(newCount);
  }, [count, onCountChange]);

  const reset = useCallback(() => {
    setCount(initialValue);
    onCountChange?.(initialValue);
  }, [initialValue, onCountChange]);

  return (
    <Card data-testid="counter-component">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Testable Counter Component
        </Typography>
        <Typography variant="h4" data-testid="counter-value" sx={{ my: 2 }}>
          {count}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            data-testid="increment-button"
            onClick={increment}
            variant="contained"
            color="primary"
          >
            +
          </Button>
          <Button
            data-testid="decrement-button"
            onClick={decrement}
            variant="outlined"
            color="primary"
          >
            -
          </Button>
          <Button
            data-testid="reset-button"
            onClick={reset}
            variant="text"
            color="secondary"
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

interface UserFormProps {
  onSubmit?: (user: { name: string; email: string; age: number; role: string; newsletter: boolean }) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = useCallback(() => {
    const newErrors: string[] = [];
    
    if (!name.trim()) newErrors.push('Name is required');
    if (!email.trim()) newErrors.push('Email is required');
    if (!email.includes('@')) newErrors.push('Email must be valid');
    if (!age || isNaN(Number(age)) || Number(age) < 1) newErrors.push('Age must be a valid number');
    if (!role) newErrors.push('Role is required');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  }, [name, email, age, role]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.({
        name: name.trim(),
        email: email.trim(),
        age: Number(age),
        role,
        newsletter,
      });
      // Reset form
      setName('');
      setEmail('');
      setAge('');
      setRole('');
      setNewsletter(false);
      setErrors([]);
    }
  }, [name, email, age, role, newsletter, validateForm, onSubmit]);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  return (
    <Card data-testid="user-form">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          User Registration Form
        </Typography>
        
        {errors.length > 0 && (
          <Alert severity="error" data-testid="form-errors" sx={{ mb: 2 }}>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            data-testid="name-input"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          
          <TextField
            data-testid="email-input"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          
          <TextField
            data-testid="age-input"
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
            required
          />
          
          <FormControl fullWidth required>
            <InputLabel>Role</InputLabel>
            <Select
              data-testid="role-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value="developer">Developer</MenuItem>
              <MenuItem value="designer">Designer</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="tester">Tester</MenuItem>
            </Select>
          </FormControl>
          
          <FormControlLabel
            control={
              <Checkbox
                data-testid="newsletter-checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
              />
            }
            label="Subscribe to newsletter"
          />
          
          <Button
            data-testid="submit-button"
            type="submit"
            variant="contained"
            color="primary"
          >
            Register User
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Async component for testing async operations
interface AsyncDataProps {
  delay?: number;
}

export const AsyncDataComponent: React.FC<AsyncDataProps> = ({ delay = 1000 }) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Simulate random success/failure
      if (Math.random() > 0.3) {
        setData(`Data loaded at ${new Date().toLocaleTimeString()}`);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [delay]);

  return (
    <Card data-testid="async-data-component">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Async Data Component
        </Typography>
        
        <Button
          data-testid="fetch-button"
          onClick={fetchData}
          variant="contained"
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </Button>
        
        {loading && (
          <Alert severity="info" data-testid="loading-message">
            Loading data...
          </Alert>
        )}
        
        {data && (
          <Alert severity="success" data-testid="success-message">
            {data}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" data-testid="error-message">
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

// Main Testing Page
const TestingPage: React.FC = () => {
  const [counterValue, setCounterValue] = useState(0);
  const [submittedUsers, setSubmittedUsers] = useState<any[]>([]);

  const handleCounterChange = useCallback((count: number) => {
    setCounterValue(count);
  }, []);

  const handleUserSubmit = useCallback((user: any) => {
    setSubmittedUsers(prev => [...prev, { ...user, id: Date.now() }]);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        React Testing
      </Typography>
      <Typography variant="body1" paragraph>
        Learn React testing patterns with interactive examples. These components include
        proper test-ids and demonstrate common testing scenarios.
      </Typography>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        {/* Counter Component */}
        <Box>
          <TestableCounter
            initialValue={0}
            onCountChange={handleCounterChange}
          />
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Current Counter Value: {counterValue}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              This demonstrates testing user interactions and state changes.
            </Typography>
          </Paper>
        </Box>

        {/* Form Component */}
        <Box>
          <UserForm onSubmit={handleUserSubmit} />
        </Box>

        {/* Async Component */}
        <Box>
          <AsyncDataComponent delay={2000} />
        </Box>

        {/* Submitted Users Display */}
        <Box>
          <Card data-testid="submitted-users">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Submitted Users ({submittedUsers.length})
              </Typography>
              {submittedUsers.length === 0 ? (
                <Typography color="text.secondary">
                  No users submitted yet
                </Typography>
              ) : (
                <List>
                  {submittedUsers.map((user) => (
                    <ListItem key={user.id} divider>
                      <ListItemText
                        primary={`${user.name} (${user.email})`}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Chip label={`Age: ${user.age}`} size="small" />
                            <Chip label={user.role} size="small" color="primary" />
                            {user.newsletter && (
                              <Chip label="Newsletter" size="small" color="secondary" />
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Testing Best Practices */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          React Testing Best Practices
        </Typography>
        
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Testing Library Principles
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Test behavior, not implementation"
                  secondary="Focus on what the user sees and does, not internal state"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Use semantic queries"
                  secondary="Prefer getByRole, getByLabelText over getByTestId when possible"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Write tests that are accessible"
                  secondary="Good accessibility usually means good testability"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Test user interactions"
                  secondary="Click buttons, fill forms, navigate - test like a user"
                />
              </ListItem>
            </List>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Common Test Patterns
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Arrange, Act, Assert"
                  secondary="Set up component, perform action, verify result"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Mock external dependencies"
                  secondary="API calls, timers, modules that aren't part of the test"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Test error states"
                  secondary="Ensure your app handles failures gracefully"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Use data-testid sparingly"
                  secondary="Only when semantic queries aren't sufficient"
                />
              </ListItem>
            </List>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Example Test Structure
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// Counter Component Test Example
import { render, screen, fireEvent } from '@testing-library/react';
import { TestableCounter } from './TestableCounter';

describe('TestableCounter', () => {
  test('renders with initial value', () => {
    render(<TestableCounter initialValue={5} />);
    expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
  });

  test('increments count when increment button is clicked', () => {
    render(<TestableCounter />);
    const incrementButton = screen.getByTestId('increment-button');
    
    fireEvent.click(incrementButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
  });

  test('calls onCountChange when count changes', () => {
    const mockOnCountChange = jest.fn();
    render(<TestableCounter onCountChange={mockOnCountChange} />);
    
    fireEvent.click(screen.getByTestId('increment-button'));
    
    expect(mockOnCountChange).toHaveBeenCalledWith(1);
  });
});`}
          </Typography>
        </Paper>
      </Paper>
    </Container>
  );
};

export default TestingPage;
