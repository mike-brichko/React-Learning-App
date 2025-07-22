import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel
} from '@mui/material';

// Higher-Order Component Pattern
interface WithLoadingProps {
  isLoading: boolean;
}

// HOC Function - takes a component and returns enhanced component
const withLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithLoadingComponent = (props: P & WithLoadingProps) => {
    const { isLoading, ...otherProps } = props;
    
    if (isLoading) {
      return (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Loading...</Typography>
          </CardContent>
        </Card>
      );
    }
    
    return <WrappedComponent {...(otherProps as P)} />;
  };

  // Set display name for better debugging
  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithLoadingComponent;
};

// Base Component to be enhanced
const DataDisplay: React.FC<{ data: string; title?: string }> = ({ data, title = "Data Display" }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Data: {data}
      </Typography>
      <Alert severity="success" sx={{ mt: 2 }}>
        Component rendered successfully!
      </Alert>
    </CardContent>
  </Card>
);

// Enhanced component with loading capability
const DataDisplayWithLoading = withLoading(DataDisplay);

// Another example component
const UserProfile: React.FC<{ user: { name: string; email: string } }> = ({ user }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">User Profile</Typography>
      <Typography>Name: {user.name}</Typography>
      <Typography>Email: {user.email}</Typography>
    </CardContent>
  </Card>
);

const UserProfileWithLoading = withLoading(UserProfile);

// Demo Component
const HigherOrderComponentDemo: React.FC = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const simulateLoading = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Higher-Order Component (HOC)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Functions that take a component and return a new component with additional functionality.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">HOC Pattern:</Typography>
          <Typography variant="caption">
            • Takes a component as argument • Returns enhanced component with additional props/behavior • Reusable across multiple components • Follows convention: withFeatureName
          </Typography>
        </Alert>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Controls:</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={isDataLoading} 
                  onChange={(e) => setIsDataLoading(e.target.checked)} 
                />
              }
              label="Data Loading State"
            />
            <Button 
              onClick={() => simulateLoading(setIsDataLoading)}
              variant="outlined"
              size="small"
            >
              Simulate Data Loading
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={isUserLoading} 
                  onChange={(e) => setIsUserLoading(e.target.checked)} 
                />
              }
              label="User Loading State"
            />
            <Button 
              onClick={() => simulateLoading(setIsUserLoading)}
              variant="outlined"
              size="small"
            >
              Simulate User Loading
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
          <DataDisplayWithLoading
            isLoading={isDataLoading}
            data="Sample API data"
            title="Enhanced Data Component"
          />
          
          <UserProfileWithLoading
            isLoading={isUserLoading}
            user={{ name: "John Doe", email: "john@example.com" }}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2">HOC Benefits:</Typography>
          <ul>
            <li><strong>Reusability:</strong> Apply same enhancement to multiple components</li>
            <li><strong>Separation of Concerns:</strong> Keep enhancement logic separate</li>
            <li><strong>Composition:</strong> Combine multiple HOCs for complex behavior</li>
            <li><strong>Props Injection:</strong> Add props without modifying original component</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Common Use Cases:</Typography>
          <ul>
            <li><strong>Authentication:</strong> withAuth HOC for protected routes</li>
            <li><strong>Loading States:</strong> withLoading for async operations</li>
            <li><strong>Error Handling:</strong> withErrorBoundary for error management</li>
            <li><strong>Analytics:</strong> withTracking for user interaction tracking</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 Modern React favors custom hooks over HOCs for most use cases, but HOCs are still valuable for component enhancement patterns.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default HigherOrderComponentDemo;
