import React, { useSyncExternalStore, useState, useCallback } from 'react';
import { Typography, Box, Card, CardContent, Button, Chip, Paper, Switch, FormControlLabel } from '@mui/material';

// External store for window dimensions
class WindowDimensionsStore {
  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: (window.innerWidth / window.innerHeight).toFixed(2)
    };
  };

  getServerSnapshot = () => {
    return {
      width: 1200,
      height: 800,
      ratio: '1.50'
    };
  };

  private notify = () => {
    this.listeners.forEach(listener => listener());
  };

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.notify);
    }
  }
}

// External store for online status
class OnlineStatusStore {
  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => navigator.onLine;
  getServerSnapshot = () => true;

  private notify = () => {
    this.listeners.forEach(listener => listener());
  };

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.notify);
      window.addEventListener('offline', this.notify);
    }
  }
}

// External store for theme preference
class ThemeStore {
  private listeners = new Set<() => void>();
  private _theme: 'light' | 'dark' = 'light';

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this._theme;
  getServerSnapshot = () => 'light' as const;

  setTheme = (theme: 'light' | 'dark') => {
    this._theme = theme;
    this.notify();
  };

  private notify = () => {
    this.listeners.forEach(listener => listener());
  };
}

// Create store instances
const windowStore = new WindowDimensionsStore();
const onlineStore = new OnlineStatusStore();
const themeStore = new ThemeStore();

const UseSyncExternalStoreDemo: React.FC = () => {
  // Subscribe to external stores
  const windowDimensions = useSyncExternalStore(
    windowStore.subscribe,
    windowStore.getSnapshot,
    windowStore.getServerSnapshot
  );

  const isOnline = useSyncExternalStore(
    onlineStore.subscribe,
    onlineStore.getSnapshot,
    onlineStore.getServerSnapshot
  );

  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  const [resizeCount, setResizeCount] = useState(0);

  // Custom hook example for localStorage
  const useLocalStorage = (key: string, initialValue: string) => {
    const subscribe = useCallback((listener: () => void) => {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key) {
          listener();
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, [key]);

    const getSnapshot = () => {
      return localStorage.getItem(key) || initialValue;
    };

    const getServerSnapshot = () => initialValue;

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  };

  const localStorageValue = useLocalStorage('demo-key', 'default');

  const handleThemeToggle = () => {
    themeStore.setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const updateLocalStorage = () => {
    const newValue = `Updated at ${new Date().toLocaleTimeString()}`;
    localStorage.setItem('demo-key', newValue);
    // Manually trigger storage event for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'demo-key',
      newValue,
      oldValue: localStorageValue
    }));
  };

  const simulateOffline = () => {
    // Note: This won't actually change navigator.onLine, just for demo
    alert('In a real app, you could simulate offline by disconnecting network or using browser dev tools');
  };

  // Track resize events
  React.useEffect(() => {
    setResizeCount(prev => prev + 1);
  }, [windowDimensions]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          13. useSyncExternalStore Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Subscribes to external stores and keeps component synchronized with their state changes.
        </Typography>

        <Box sx={{ display: 'grid', gap: 2, mb: 2 }}>
          <Paper sx={{ p: 2, bgcolor: theme === 'dark' ? 'grey.800' : 'grey.100' }}>
            <Typography variant="subtitle2" gutterBottom>
              Window Dimensions Store
            </Typography>
            <Typography variant="body2">
              Width: {windowDimensions.width}px | Height: {windowDimensions.height}px
            </Typography>
            <Typography variant="body2">
              Aspect Ratio: {windowDimensions.ratio} | Resize Count: {resizeCount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Try resizing your browser window to see real-time updates
            </Typography>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Online Status Store
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={isOnline ? 'Online' : 'Offline'} 
                color={isOnline ? 'success' : 'error'}
                size="small"
              />
              <Button onClick={simulateOffline} variant="outlined" size="small">
                Simulate Offline
              </Button>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Connection status is monitored automatically
            </Typography>
          </Paper>

          <Paper sx={{ p: 2, bgcolor: theme === 'dark' ? 'grey.800' : 'grey.100' }}>
            <Typography variant="subtitle2" gutterBottom>
              Theme Store
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={theme === 'dark'}
                  onChange={handleThemeToggle}
                />
              }
              label={`Current theme: ${theme}`}
            />
            <Typography variant="caption" color="text.secondary" display="block">
              Custom external store for theme management
            </Typography>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              LocalStorage Store
            </Typography>
            <Typography variant="body2" gutterBottom>
              Value: "{localStorageValue}"
            </Typography>
            <Button onClick={updateLocalStorage} variant="contained" size="small">
              Update LocalStorage
            </Button>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
              Open multiple tabs to see cross-tab synchronization
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">How useSyncExternalStore works:</Typography>
          <ul>
            <li><strong>Subscribe:</strong> Function to subscribe to store changes</li>
            <li><strong>getSnapshot:</strong> Function to read current store value</li>
            <li><strong>getServerSnapshot:</strong> Optional server-side value for SSR</li>
            <li><strong>Automatic updates:</strong> Component re-renders when store changes</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>🔄 External Store Examples</Typography>
          <Typography variant="caption">
            Perfect for: browser APIs (window size, online status), third-party libraries,
            global state managers, WebSocket connections, or any external data source
            that changes independently of React.
          </Typography>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>⚡ Performance Note</Typography>
          <Typography variant="caption">
            The hook automatically handles concurrent rendering and ensures consistent snapshots
            across all components, preventing tearing during updates.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UseSyncExternalStoreDemo;
