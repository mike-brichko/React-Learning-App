import React, { createContext, useContext, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Container,
  Paper,
  Chip,
} from '@mui/material';
import ContextNavigation from '../../components/ContextNavigation';

// ❌ BAD PRACTICE: Massive context with everything
interface MassiveContextType {
  // User data
  user: any;
  setUser: (user: any) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  
  // Theme data
  theme: string;
  setTheme: (theme: string) => void;
  
  // Todo data
  todos: any[];
  setTodos: (todos: any[]) => void;
  
  // Shopping cart
  cart: any[];
  setCart: (cart: any[]) => void;
  
  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;
  
  // API data
  posts: any[];
  setPosts: (posts: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Form data
  formData: any;
  setFormData: (data: any) => void;
  
  // Notifications
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
  
  // Settings
  settings: any;
  setSettings: (settings: any) => void;
  
  // Random data
  randomValue: number;
  setRandomValue: (value: number) => void;
}

const MassiveContext = createContext<MassiveContextType>({} as MassiveContextType);

const MassiveContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');
  const [todos, setTodos] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [notifications, setNotifications] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [randomValue, setRandomValue] = useState(0);

  // ❌ Creating new object on every render
  const contextValue = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    theme,
    setTheme,
    todos,
    setTodos,
    cart,
    setCart,
    currentPage,
    setCurrentPage,
    posts,
    setPosts,
    loading,
    setLoading,
    formData,
    setFormData,
    notifications,
    setNotifications,
    settings,
    setSettings,
    randomValue,
    setRandomValue,
  };

  return (
    <MassiveContext.Provider value={contextValue}>
      {children}
    </MassiveContext.Provider>
  );
};

const useMassiveContext = () => {
  return useContext(MassiveContext);
};

// Components that demonstrate the problem
const ThemeComponent: React.FC = () => {
  const { theme, setTheme, randomValue } = useMassiveContext();
  
  console.log('🔴 ThemeComponent re-rendered due to massive context!', { theme, randomValue });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="error">Theme Component</Typography>
        <Typography>Current theme: {theme}</Typography>
        <Button 
          variant="outlined" 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          sx={{ mt: 1 }}
        >
          Toggle Theme
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❌ Re-renders when ANY context value changes! Random value: {randomValue}
        </Typography>
      </CardContent>
    </Card>
  );
};

const UserComponent: React.FC = () => {
  const { user, isLoggedIn, setIsLoggedIn, randomValue } = useMassiveContext();
  
  console.log('🔴 UserComponent re-rendered due to massive context!', { user, isLoggedIn, randomValue });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="error">User Component</Typography>
        <Typography>Status: {isLoggedIn ? 'Logged in' : 'Not logged in'}</Typography>
        <Button 
          variant="outlined" 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          sx={{ mt: 1 }}
        >
          Toggle Login
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❌ Re-renders for unrelated changes! Random value: {randomValue}
        </Typography>
      </CardContent>
    </Card>
  );
};

const RandomTrigger: React.FC = () => {
  const { randomValue, setRandomValue } = useMassiveContext();
  
  const updateRandom = () => {
    setRandomValue(Math.floor(Math.random() * 1000));
  };
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="error">Random Value Trigger</Typography>
        <Typography>Current value: {randomValue}</Typography>
        <Button variant="contained" color="error" onClick={updateRandom} sx={{ mt: 1 }}>
          Update Random Value
        </Button>
        <Alert severity="error" sx={{ mt: 2 }}>
          Clicking this button causes ALL components to re-render!
        </Alert>
      </CardContent>
    </Card>
  );
};

const MassiveContextPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <ContextNavigation currentPage="massive-context" />
      
      <Typography variant="h4" gutterBottom color="error">
        ❌ Anti-Pattern: Massive Context
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        This demonstrates the anti-pattern of putting everything into a single context, 
        causing unnecessary re-renders across unrelated components.
      </Typography>

      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          🚨 What's Wrong Here?
        </Typography>
        <Typography variant="body2">
          A single context contains data for completely unrelated features: theme, user state, 
          todos, shopping cart, navigation, API data, form data, notifications, and settings. 
          When ANY value changes, ALL components that use this context will re-render.
        </Typography>
      </Alert>

      <Paper sx={{ p: 3, mb: 3, bgcolor: 'error.main', color: 'error.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Problems Demonstrated
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            label="Single Responsibility Violation" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Unnecessary Re-renders" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Tight Coupling" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Poor Performance" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
        </Box>
      </Paper>

      <MassiveContextProvider>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Open your browser console to see the excessive re-rendering!
        </Typography>
        
        <ThemeComponent />
        <UserComponent />
        <RandomTrigger />
      </MassiveContextProvider>

      <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom color="success.main">
          ✅ How to Fix This
        </Typography>
        <ul>
          <li><strong>Split by Domain:</strong> Create separate contexts for theme, user, cart, etc.</li>
          <li><strong>Single Responsibility:</strong> Each context should handle one specific concern</li>
          <li><strong>Targeted Updates:</strong> Components only subscribe to data they actually need</li>
          <li><strong>Provider Composition:</strong> Use multiple small providers instead of one giant one</li>
        </ul>
      </Paper>
    </Container>
  );
};

export default MassiveContextPage;
