import React, { Component, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Chip
} from '@mui/material';

// Error Boundary Class Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error info:', errorInfo);
    
    // Update state with error info
    this.setState({ errorInfo });
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback component
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} retry={this.retry} />;
      }

      // Default fallback UI
      return (
        <Alert severity="error" sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body2" paragraph>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          {this.state.errorInfo && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" component="pre" sx={{ 
                bgcolor: 'grey.100', 
                p: 1, 
                borderRadius: 1,
                fontSize: '0.75rem',
                overflow: 'auto',
                maxHeight: 200
              }}>
                {this.state.errorInfo.componentStack}
              </Typography>
            </Box>
          )}
          <Button variant="outlined" onClick={this.retry} size="small">
            Try Again
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}

// Custom Fallback Components
const CustomFallback: React.FC<{ error?: Error; retry: () => void }> = ({ error, retry }) => (
  <Card sx={{ border: '2px solid', borderColor: 'error.main', bgcolor: 'error.light', color: 'error.contrastText' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        🚨 Custom Error Fallback
      </Typography>
      <Typography variant="body2" paragraph>
        Error: {error?.message}
      </Typography>
      <Button variant="contained" color="error" onClick={retry}>
        Retry
      </Button>
    </CardContent>
  </Card>
);

// Buggy Components for Testing
const BuggyComponent: React.FC<{ shouldThrow: boolean; errorType: string }> = ({ shouldThrow, errorType }) => {
  if (shouldThrow) {
    switch (errorType) {
      case 'throw':
        throw new Error('Intentional error for demonstration');
      case 'null':
        // @ts-expect-error - Intentional null reference for demo
        return null.property;
      case 'undefined':
        // @ts-expect-error - Intentional undefined reference for demo
        return undefined.method();
      default:
        throw new Error('Unknown error type');
    }
  }
  
  return (
    <Card sx={{ border: '2px solid', borderColor: 'success.main' }}>
      <CardContent>
        <Typography variant="h6" color="success.main">
          ✅ Component Working Fine
        </Typography>
        <Typography variant="body2">
          This component is functioning normally without any errors.
        </Typography>
      </CardContent>
    </Card>
  );
};

const AsyncBuggyComponent: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  React.useEffect(() => {
    if (shouldThrow) {
      // Simulate async error (won't be caught by error boundary)
      setTimeout(() => {
        throw new Error('Async error - not caught by error boundary');
      }, 1000);
    }
  }, [shouldThrow]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Async Component</Typography>
        <Typography variant="body2">
          {shouldThrow 
            ? '⏱️ Async error will be thrown in 1 second (check console)' 
            : '✅ No async errors'
          }
        </Typography>
      </CardContent>
    </Card>
  );
};

// Demo Component
const ErrorBoundaryDemo: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [errorType, setErrorType] = useState('throw');
  const [asyncError, setAsyncError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = (error: Error) => {
    setErrorCount(prev => prev + 1);
    console.log('Error handled by boundary:', error.message);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Error Boundary Components
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Class components that catch JavaScript errors in their component tree and display fallback UI.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Error Boundary Features:</Typography>
          <Typography variant="caption">
            • Catch errors in component tree • Display fallback UI • Log error details • Prevent app crashes • Recovery mechanisms
          </Typography>
        </Alert>

        {/* Controls */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>Error Controls</Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Error Types:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['throw', 'null', 'undefined'].map(type => (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => setErrorType(type)}
                  color={errorType === type ? 'primary' : 'default'}
                  variant={errorType === type ? 'filled' : 'outlined'}
                  size="small"
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Button
              onClick={() => setShouldThrow(!shouldThrow)}
              variant="contained"
              color={shouldThrow ? "error" : "primary"}
              size="small"
            >
              {shouldThrow ? 'Fix Component' : 'Break Component'}
            </Button>
            
            <Button
              onClick={() => setAsyncError(!asyncError)}
              variant="outlined"
              color={asyncError ? "error" : "primary"}
              size="small"
            >
              {asyncError ? 'Stop Async Error' : 'Trigger Async Error'}
            </Button>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Errors caught: {errorCount}
          </Typography>
        </Box>

        {/* Error Boundary Examples */}
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' } }}>
          {/* Default Error Boundary */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Default Error Boundary
            </Typography>
            <ErrorBoundary onError={handleError}>
              <BuggyComponent shouldThrow={shouldThrow} errorType={errorType} />
            </ErrorBoundary>
          </Box>

          {/* Custom Fallback Error Boundary */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Custom Fallback Error Boundary
            </Typography>
            <ErrorBoundary fallback={CustomFallback} onError={handleError}>
              <BuggyComponent shouldThrow={shouldThrow} errorType={errorType} />
            </ErrorBoundary>
          </Box>
        </Box>

        {/* Async Error Example (Not Caught) */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Async Errors (Not Caught by Error Boundaries)
          </Typography>
          <AsyncBuggyComponent shouldThrow={asyncError} />
          <Alert severity="warning" sx={{ mt: 1 }}>
            <Typography variant="caption">
              Error boundaries cannot catch errors in event handlers, async code, or during server-side rendering.
            </Typography>
          </Alert>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2">What Error Boundaries Catch:</Typography>
          <ul>
            <li><strong>Render errors:</strong> Errors during component rendering</li>
            <li><strong>Lifecycle errors:</strong> Errors in lifecycle methods</li>
            <li><strong>Constructor errors:</strong> Errors in component constructors</li>
            <li><strong>Child component errors:</strong> Errors in the entire component tree below</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">What Error Boundaries DON'T Catch:</Typography>
          <ul>
            <li><strong>Event handlers:</strong> Use try-catch in event handlers</li>
            <li><strong>Async code:</strong> setTimeout, Promise rejections, etc.</li>
            <li><strong>Server-side rendering:</strong> SSR errors need separate handling</li>
            <li><strong>Errors in the error boundary itself:</strong> Would cause infinite loops</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 Error boundaries are class components only. There's no hook equivalent, but you can wrap functional components with error boundary classes.
          </Typography>
        </Alert>

        <Alert severity="info" sx={{ mt: 1 }}>
          <Typography variant="caption">
            🔍 Try breaking the components above and observe how error boundaries prevent the entire app from crashing.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ErrorBoundaryDemo;
