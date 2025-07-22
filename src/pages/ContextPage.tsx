import React, { createContext, useContext, useState, useReducer } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Divider,
  Container,
  Paper,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Counter Context with useReducer
interface CounterState {
  count: number;
  step: number;
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      return state;
  }
};

interface CounterContextType {
  state: CounterState;
  dispatch: React.Dispatch<CounterAction>;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

const CounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};

// User Context
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  users: User[];
  addUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Components using contexts
const ThemeDemo: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Card sx={{ bgcolor: theme === 'dark' ? 'grey.900' : 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Theme Context Demo
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This component uses context to manage theme state across the component tree.
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Current theme: {theme}</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            }
            label="Dark mode"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const CounterDemo: React.FC = () => {
  const { state, dispatch } = useCounter();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Counter Context with useReducer
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This demonstrates using Context with useReducer for more complex state management.
        </Typography>
        
        <Box display="flex" alignItems="center" gap={1} my={2}>
          <Button
            variant="outlined"
            onClick={() => dispatch({ type: 'decrement' })}
          >
            -
          </Button>
          <Chip label={state.count} />
          <Button
            variant="outlined"
            onClick={() => dispatch({ type: 'increment' })}
          >
            +
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch({ type: 'reset' })}
          >
            Reset
          </Button>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Step:</Typography>
          <TextField
            size="small"
            type="number"
            value={state.step}
            onChange={(e) => dispatch({
              type: 'setStep',
              payload: parseInt(e.target.value) || 1
            })}
            sx={{ width: 80 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const UserDemo: React.FC = () => {
  const { user, setUser, users, addUser } = useUser();
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      const newUser: User = {
        id: Date.now(),
        name: newUserName,
        email: newUserEmail,
      };
      addUser(newUser);
      setNewUserName('');
      setNewUserEmail('');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          User Context Demo
        </Typography>
        
        {user ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Current user: {user.name} ({user.email})
            <Button
              size="small"
              onClick={() => setUser(null)}
              sx={{ ml: 1 }}
            >
              Logout
            </Button>
          </Alert>
        ) : (
          <Alert severity="info" sx={{ mb: 2 }}>
            No user selected
          </Alert>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" mb={1}>
          Add New User
        </Typography>
        <Box mb={2}>
          <TextField
            fullWidth
            size="small"
            label="Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            size="small"
            label="Email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleAddUser}
            disabled={!newUserName || !newUserEmail}
          >
            Add User
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" mb={1}>
          Available Users ({users.length})
        </Typography>
        <Box>
          {users.map((u) => (
            <Chip
              key={u.id}
              label={`${u.name} (${u.email})`}
              onClick={() => setUser(u)}
              color={user?.id === u.id ? 'primary' : 'default'}
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const ContextPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        React Context API Playground
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Interactive examples demonstrating React Context for state management and data sharing.
      </Typography>

      <ThemeProvider>
        <CounterProvider>
          <UserProvider>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
                gap: 3,
                mb: 3,
              }}
            >
              <ThemeDemo />
              <CounterDemo />
            </Box>
            
            <Box mb={3}>
              <UserDemo />
            </Box>
          </UserProvider>
        </CounterProvider>
      </ThemeProvider>

      <Paper sx={{ p: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Context API Patterns Demonstrated
        </Typography>
        <ul>
          <li><strong>Simple State Context:</strong> Theme context with useState</li>
          <li><strong>Complex State Context:</strong> Counter with useReducer</li>
          <li><strong>Multiple Contexts:</strong> Combining different contexts</li>
          <li><strong>Custom Hooks:</strong> Encapsulating context logic</li>
          <li><strong>Error Handling:</strong> Proper context validation</li>
          <li><strong>Provider Composition:</strong> Nesting multiple providers</li>
        </ul>
      </Paper>

      <Paper sx={{ p: 3, mt: 2, bgcolor: 'warning.main', color: 'warning.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          ⚠️ When to Use Context vs Redux
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Use Context for:
            </Typography>
            <ul>
              <li>Theme/UI preferences</li>
              <li>User authentication</li>
              <li>Localization</li>
              <li>Simple shared state</li>
              <li>Component tree communication</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Use Redux for:
            </Typography>
            <ul>
              <li>Complex application state</li>
              <li>Time-travel debugging</li>
              <li>Middleware requirements</li>
              <li>Large team collaboration</li>
              <li>Predictable state updates</li>
            </ul>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContextPage;
