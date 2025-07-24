import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
} from '@mui/material';

// ❌ BAD PRACTICE 1: Massive context with everything
interface AppContextType {
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
  
  // And many more...
  randomCounter: number;
  setRandomCounter: (count: number) => void;
  
  // Heavy computation result
  heavyResult: number;
}

// ❌ BAD PRACTICE 2: No default value or undefined context
const AppContext = createContext<AppContextType>({} as AppContextType);

// ❌ BAD PRACTICE 3: Provider with too much state and logic
const BadAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  const [randomCounter, setRandomCounter] = useState(0);

  // ❌ BAD PRACTICE 4: Heavy computation in provider
  const heavyComputation = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  };

  // ❌ BAD PRACTICE 5: Side effects without proper dependency management
  useEffect(() => {
    // Simulating an API call that runs on every render
    const fetchData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 100));
      setPosts([
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
      ]);
      setLoading(false);
    };
    
    fetchData();
    
    // Also update random counter frequently
    setRandomCounter(Math.floor(Math.random() * 1000));
  }); // ❌ No dependency array - runs on every render!

  // ❌ BAD PRACTICE 6: Creating new objects on every render
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
    randomCounter,
    setRandomCounter,
    // ❌ Adding computed value that recalculates every render
    heavyResult: heavyComputation(),
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// ❌ BAD PRACTICE 7: No error boundary or null check in hook
const useBadAppContext = () => {
  return useContext(AppContext);
};

// Components that will re-render unnecessarily

// ❌ This component only needs theme but gets all context updates
const ThemeDisplay: React.FC = () => {
  const { theme, randomCounter } = useBadAppContext();
  
  console.log('ThemeDisplay re-rendered!', { theme, randomCounter });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Theme Component</Typography>
        <Typography>Current theme: {theme}</Typography>
        <Typography variant="caption">
          This component re-renders every time ANY context value changes!
          Random counter: {randomCounter}
        </Typography>
      </CardContent>
    </Card>
  );
};

// ❌ This component only needs user info but re-renders for everything
const UserDisplay: React.FC = () => {
  const { user, isLoggedIn, loading, randomCounter } = useBadAppContext();
  
  console.log('UserDisplay re-rendered!', { user, isLoggedIn, randomCounter });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">User Component</Typography>
        <Typography>
          Status: {isLoggedIn ? 'Logged in' : 'Not logged in'}
        </Typography>
        <Typography variant="caption">
          This component re-renders constantly! Counter: {randomCounter}
        </Typography>
        {loading && <CircularProgress size={20} />}
      </CardContent>
    </Card>
  );
};

// ❌ This component accesses context deep in the tree for simple data
const PostsList: React.FC = () => {
  const { posts, loading, heavyResult, randomCounter } = useBadAppContext();
  
  console.log('PostsList re-rendered!', { posts: posts.length, heavyResult, randomCounter });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Posts Component</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List dense>
            {posts.map((post: any) => (
              <ListItem key={post.id}>
                <ListItemText 
                  primary={post.title} 
                  secondary={`Heavy computation result: ${heavyResult?.toFixed(2)}`} 
                />
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="caption">
          Re-renders constantly! Counter: {randomCounter}
        </Typography>
      </CardContent>
    </Card>
  );
};

// ❌ Component that modifies context frequently
const ContextModifier: React.FC = () => {
  const { randomCounter, setRandomCounter, setTheme, theme } = useBadAppContext();
  
  const updateCounter = () => {
    setRandomCounter(Math.floor(Math.random() * 1000));
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Context Modifier</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button variant="contained" onClick={updateCounter}>
            Update Counter ({randomCounter})
          </Button>
          <Button variant="outlined" onClick={toggleTheme}>
            Toggle Theme ({theme})
          </Button>
        </Box>
        <Alert severity="warning">
          Every button click causes ALL components to re-render!
        </Alert>
      </CardContent>
    </Card>
  );
};

// Main component that demonstrates all the bad practices
export const PoorContextExample: React.FC = () => {
  return (
    <BadAppProvider>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom color="error">
          ❌ Poor Context API Usage
        </Typography>
        
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="subtitle2">What's Wrong Here?</Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Massive context with unrelated data</li>
            <li>New objects created on every render</li>
            <li>Heavy computations in provider</li>
            <li>useEffect without dependencies</li>
            <li>All components re-render for any change</li>
            <li>No proper error handling</li>
          </ul>
        </Alert>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Open your browser's console to see how often these components re-render!
        </Typography>

        <ThemeDisplay />
        <UserDisplay />
        <PostsList />
        <ContextModifier />
      </Box>
    </BadAppProvider>
  );
};

export default PoorContextExample;
