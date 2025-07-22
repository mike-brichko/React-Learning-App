import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  Chip
} from '@mui/material';

// Render Props Pattern - Mouse Tracker
interface MouseTrackerProps {
  children: (mouse: { x: number; y: number }) => React.ReactNode;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ children }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  return (
    <Card 
      onMouseMove={handleMouseMove} 
      sx={{ 
        minHeight: 150, 
        cursor: 'crosshair',
        border: '2px dashed',
        borderColor: 'primary.main',
        position: 'relative'
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>Mouse Tracker</Typography>
        <Typography variant="caption" color="text.secondary">
          Move your mouse around this area
        </Typography>
        {children(mouse)}
      </CardContent>
    </Card>
  );
};

// Render Props Pattern - Data Fetcher
interface DataFetcherProps<T> {
  url: string;
  children: (data: { loading: boolean; data: T | null; error: string | null }) => React.ReactNode;
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [state, setState] = useState({
    loading: false,
    data: null as T | null,
    error: null as string | null
  });

  const fetchData = async () => {
    setState({ loading: true, data: null, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate data based on URL
      const mockData = {
        users: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' }
        ],
        posts: [
          { id: 1, title: 'Hello World', content: 'First post' },
          { id: 2, title: 'React Patterns', content: 'Learning render props' }
        ]
      };
      
      const key = url.split('/').pop() as keyof typeof mockData;
      setState({ 
        loading: false, 
        data: mockData[key] as T, 
        error: null 
      });
    } catch (error) {
      setState({ 
        loading: false, 
        data: null, 
        error: 'Failed to fetch data' 
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Data Fetcher</Typography>
        <Typography variant="caption" color="text.secondary" paragraph>
          URL: {url}
        </Typography>
        {children(state)}
      </CardContent>
    </Card>
  );
};

// Demo Component
const RenderPropsDemo: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Render Props Pattern
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          A technique for sharing code between components using a prop whose value is a function.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Pattern Structure:</Typography>
          <Typography variant="caption">
            • Component accepts a function as children or render prop • Function receives data/state as arguments • Function returns React nodes to render • Enables flexible, reusable logic sharing
          </Typography>
        </Alert>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
          {/* Mouse Tracker Example */}
          <MouseTracker>
            {(mouse) => (
              <Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Mouse Position: ({mouse.x}, {mouse.y})
                </Typography>
                <Box 
                  sx={{ 
                    position: 'absolute',
                    left: mouse.x - 5,
                    top: mouse.y - 5,
                    width: 10,
                    height: 10,
                    backgroundColor: 'error.main',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                  }} 
                />
                <Typography variant="caption" color="primary">
                  Red dot follows your cursor!
                </Typography>
              </Box>
            )}
          </MouseTracker>

          {/* Alternative Mouse Tracker rendering */}
          <MouseTracker>
            {(mouse) => (
              <Box>
                <Typography variant="body2">
                  Quadrant: {mouse.x > 150 ? 'Right' : 'Left'} {mouse.y > 75 ? 'Bottom' : 'Top'}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip 
                    label={`X: ${mouse.x}`} 
                    size="small" 
                    color="primary" 
                    sx={{ mr: 1 }} 
                  />
                  <Chip 
                    label={`Y: ${mouse.y}`} 
                    size="small" 
                    color="secondary" 
                  />
                </Box>
              </Box>
            )}
          </MouseTracker>
        </Box>

        <Box sx={{ mt: 3, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
          {/* Data Fetcher Examples */}
          <DataFetcher<Array<{ id: number; name: string }>> url="/api/users">
            {({ loading, data, error }) => (
              <Box>
                {loading && <Typography>Loading users...</Typography>}
                {error && <Alert severity="error">{error}</Alert>}
                {data && (
                  <Box>
                    <Typography variant="subtitle2">Users:</Typography>
                    {data.map(user => (
                      <Chip key={user.id} label={user.name} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </DataFetcher>

          <DataFetcher<Array<{ id: number; title: string; content: string }>> url="/api/posts">
            {({ loading, data, error }) => (
              <Box>
                {loading && <Typography>Loading posts...</Typography>}
                {error && <Alert severity="error">{error}</Alert>}
                {data && (
                  <Box>
                    <Typography variant="subtitle2">Posts:</Typography>
                    {data.map(post => (
                      <Box key={post.id} sx={{ mb: 1 }}>
                        <Typography variant="body2" fontWeight="bold">
                          {post.title}
                        </Typography>
                        <Typography variant="caption">
                          {post.content}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </DataFetcher>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2">Benefits:</Typography>
          <ul>
            <li><strong>Flexibility:</strong> Consumer decides how to render the data</li>
            <li><strong>Reusability:</strong> Same logic, multiple rendering strategies</li>
            <li><strong>Separation:</strong> Logic separated from presentation</li>
            <li><strong>Composition:</strong> Easy to combine with other patterns</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Common Use Cases:</Typography>
          <ul>
            <li><strong>Data fetching:</strong> API calls with flexible rendering</li>
            <li><strong>Mouse/Touch tracking:</strong> Input handling with custom UI</li>
            <li><strong>Form validation:</strong> Validation logic with custom error display</li>
            <li><strong>Animation:</strong> Animation state with custom transitions</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 Custom hooks often provide a cleaner alternative to render props in modern React, but render props remain useful for component-based APIs.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default RenderPropsDemo;
