import React, { createContext, useContext, useState, useReducer, useMemo } from 'react';
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
import ContextNavigation from '../components/ContextNavigation';

// ✅ GOOD PRACTICE 1: Separate contexts for different concerns

// Theme Context - Simple, focused context
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

  // ✅ GOOD PRACTICE: Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ GOOD PRACTICE 2: Custom hook with proper error handling
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Counter Context with useReducer - Complex state management
interface CounterState {
  count: number;
  step: number;
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; payload: number };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { ...state, count: 0 };
    case 'setStep':
      return { ...state, step: action.payload };
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

  // ✅ GOOD PRACTICE: Memoize context value
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <CounterContext.Provider value={contextValue}>
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

// User Context - Another focused context
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

  // ✅ GOOD PRACTICE: Memoize complex context values
  const contextValue = useMemo(() => ({
    user,
    setUser,
    users,
    addUser
  }), [user, users]);

  return (
    <UserContext.Provider value={contextValue}>
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

// ✅ GOOD PRACTICE 3: Components only consume what they need

// Theme component only uses theme context
const ThemeDemo: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  console.log('✅ ThemeDemo re-rendered only when theme changes');

  return (
    <Card sx={{ bgcolor: theme === 'dark' ? 'grey.900' : 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ✅ Theme Context Demo
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This component uses a focused context and only re-renders when theme changes.
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

// Counter component only uses counter context
const CounterDemo: React.FC = () => {
  const { state, dispatch } = useCounter();

  console.log('✅ CounterDemo re-rendered only when counter state changes');

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ✅ Counter Context with useReducer
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This demonstrates proper useReducer usage with Context for complex state.
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

// User component only uses user context
const UserDemo: React.FC = () => {
  const { user, setUser, users, addUser } = useUser();
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  console.log('✅ UserDemo re-rendered only when user state changes');

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
          ✅ User Context Demo
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

const GoodContextPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <ContextNavigation currentPage="good-context" />
      
      <Typography variant="h4" gutterBottom color="success.main">
        ✅ Good Context API Usage
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Learn the right way to use React Context API with performance optimizations, 
        proper separation of concerns, and best practices.
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          🎯 Best Practices Demonstrated
        </Typography>
        <Typography variant="body2">
          Open your browser's console to see how these components only re-render 
          when their specific context data changes!
        </Typography>
      </Alert>

      {/* Multiple Provider Composition */}
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

      <Paper sx={{ p: 3, bgcolor: 'success.main', color: 'success.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Best Practices Implemented
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Context Design:
            </Typography>
            <ul>
              <li><strong>Separation of Concerns:</strong> Each context handles one domain</li>
              <li><strong>Focused Interfaces:</strong> Small, specific context types</li>
              <li><strong>Proper Error Handling:</strong> Custom hooks with validation</li>
              <li><strong>Type Safety:</strong> Full TypeScript integration</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Performance Optimizations:
            </Typography>
            <ul>
              <li><strong>Memoized Values:</strong> useMemo prevents object recreation</li>
              <li><strong>Targeted Updates:</strong> Components only consume needed data</li>
              <li><strong>Provider Composition:</strong> Multiple small providers</li>
              <li><strong>Reduced Re-renders:</strong> Optimized dependency tracking</li>
            </ul>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 2, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          📚 Context Patterns Demonstrated
        </Typography>
        <ul>
          <li><strong>Simple State Context:</strong> Theme context with useState and memoization</li>
          <li><strong>Complex State Context:</strong> Counter with useReducer for predictable updates</li>
          <li><strong>CRUD Operations:</strong> User context with add/remove/select operations</li>
          <li><strong>Custom Hooks:</strong> Encapsulating context logic with error boundaries</li>
          <li><strong>Provider Composition:</strong> Combining multiple contexts cleanly</li>
          <li><strong>Performance Optimization:</strong> Preventing unnecessary re-renders</li>
        </ul>
      </Paper>

      <Paper sx={{ p: 3, mt: 2, bgcolor: 'info.main', color: 'info.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          ⚠️ When to Use Context vs Other Solutions
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
              <li>User authentication state</li>
              <li>Localization/language</li>
              <li>Simple shared state</li>
              <li>Component tree communication</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Consider Alternatives for:
            </Typography>
            <ul>
              <li>Frequently changing data</li>
              <li>Complex business logic</li>
              <li>Large application state</li>
              <li>Time-travel debugging needs</li>
              <li>Advanced middleware requirements</li>
            </ul>
          </Box>
        </Box>
      </Paper>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          🔄 Compare with Poor Practices
        </Typography>
        <Typography variant="body2">
          Visit the <strong>Poor Context API Usage</strong> page to see what happens 
          when these best practices are ignored!
        </Typography>
      </Alert>
    </Container>
  );
};

export default GoodContextPage;
