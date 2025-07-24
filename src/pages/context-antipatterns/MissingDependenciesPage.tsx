import React, { createContext, useContext, useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import ContextNavigation from '../../components/ContextNavigation';

// Context for demonstration
interface DataContextType {
  data: any[];
  setData: (data: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  counter: number;
  setCounter: (counter: number) => void;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

// ❌ BAD PRACTICE: useEffect without dependencies
const BadDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  console.log('🔴 BadDataProvider rendering...');

  // ❌ BAD PRACTICE 1: No dependency array - runs on every render!
  useEffect(() => {
    console.log('🔴 useEffect running on EVERY render!');
    
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setData([
        { id: 1, title: `Data Item ${Date.now()}` },
        { id: 2, title: `Another Item ${Date.now()}` },
      ]);
      setLoading(false);
    };
    
    fetchData();
    
    // ❌ Update counter on every render
    setCounter(prev => prev + 1);
  }); // ❌ Missing dependency array!

  // ❌ BAD PRACTICE 2: Another useEffect without proper dependencies
  useEffect(() => {
    console.log('🔴 Another useEffect running constantly!');
    // Some side effect that shouldn't run every time
    document.title = `Counter: ${counter}`;
  }); // ❌ Missing dependency array!

  const contextValue = {
    data,
    setData,
    loading,
    setLoading,
    counter,
    setCounter,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => {
  return useContext(DataContext);
};

// Components that show the effects
const DataList: React.FC = () => {
  const { data, loading } = useDataContext();
  
  console.log('🔴 DataList re-rendered!', { dataLength: data.length, loading });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="error">Data List</Typography>
        {loading ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={20} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <Box>
            {data.map((item: any) => (
              <Typography key={item.id}>{item.title}</Typography>
            ))}
          </Box>
        )}
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❌ Data keeps changing due to constant API calls!
        </Typography>
      </CardContent>
    </Card>
  );
};

const CounterDisplay: React.FC = () => {
  const { counter } = useDataContext();
  
  console.log('🔴 CounterDisplay re-rendered!', { counter });
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="error">Counter Display</Typography>
        <Typography variant="h4" color="primary">{counter}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          ❌ Counter increases constantly due to useEffect without dependencies!
        </Typography>
      </CardContent>
    </Card>
  );
};

const TriggerComponent: React.FC = () => {
  const { setCounter } = useDataContext();
  const [localState, setLocalState] = useState(0);
  
  const triggerReRender = () => {
    setLocalState(prev => prev + 1);
  };
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="error">Trigger Component</Typography>
        <Typography>Local state: {localState}</Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={triggerReRender}
          sx={{ mt: 1 }}
        >
          Force Re-render
        </Button>
        <Alert severity="error" sx={{ mt: 2 }}>
          Clicking this triggers a re-render, which runs ALL useEffects without dependencies!
        </Alert>
      </CardContent>
    </Card>
  );
};

const MissingDependenciesPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <ContextNavigation currentPage="missing-dependencies" />
      
      <Typography variant="h4" gutterBottom color="error">
        ❌ Anti-Pattern: Missing Dependencies
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        This demonstrates the anti-pattern of using useEffect without proper dependency arrays, 
        causing side effects to run on every render instead of when they should.
      </Typography>

      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          🚨 What's Wrong Here?
        </Typography>
        <Typography variant="body2">
          useEffect hooks without dependency arrays (or with incorrect dependencies) run on 
          every render, causing infinite loops, excessive API calls, and performance issues.
        </Typography>
      </Alert>

      <Paper sx={{ p: 3, mb: 3, bgcolor: 'error.main', color: 'error.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Problems Demonstrated
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            label="Infinite Re-renders" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Excessive API Calls" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="State Update Loops" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
          <Chip 
            label="Performance Issues" 
            color="secondary" 
            variant="outlined"
            sx={{ color: 'inherit', borderColor: 'currentColor' }}
          />
        </Box>
      </Paper>

      <BadDataProvider>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Watch the console and network tab - effects run constantly!
        </Typography>
        
        <DataList />
        <CounterDisplay />
        <TriggerComponent />
      </BadDataProvider>

      <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom color="success.main">
          ✅ How to Fix This
        </Typography>
        <ul>
          <li><strong>Add Dependencies:</strong> Always include a dependency array in useEffect</li>
          <li><strong>Empty Array:</strong> Use [] for effects that should run only once</li>
          <li><strong>Specific Dependencies:</strong> Include only the values the effect actually uses</li>
          <li><strong>useCallback/useMemo:</strong> Stabilize function and object dependencies</li>
          <li><strong>Cleanup:</strong> Return cleanup functions when needed</li>
        </ul>
        
        <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            ✅ Correct Patterns:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when specific values change
useEffect(() => {
  updateTitle(counter);
}, [counter]);`}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default MissingDependenciesPage;
