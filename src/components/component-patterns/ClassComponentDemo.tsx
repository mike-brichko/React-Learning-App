import React, { Component } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Chip
} from '@mui/material';

// Class Component State Interface
interface CounterState {
  count: number;
  history: number[];
}

// Class Component Implementation
class ClassCounter extends Component<{}, CounterState> {
  constructor(props: {}) {
    super(props);
    this.state = { 
      count: 0,
      history: [0]
    };
  }

  componentDidMount() {
    console.log('ClassCounter mounted');
  }

  componentDidUpdate(_prevProps: {}, prevState: CounterState) {
    if (prevState.count !== this.state.count) {
      console.log(`Count updated from ${prevState.count} to ${this.state.count}`);
    }
  }

  componentWillUnmount() {
    console.log('ClassCounter will unmount');
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
      history: [...prevState.history, prevState.count + 1]
    }));
  };

  decrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
      history: [...prevState.history, prevState.count - 1]
    }));
  };

  reset = () => {
    this.setState({
      count: 0,
      history: [0]
    });
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Class Component Example</Typography>
          <Typography variant="h4" color="primary" sx={{ my: 2 }}>
            Count: {this.state.count}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button onClick={this.decrement} variant="outlined">
              -
            </Button>
            <Button onClick={this.increment} variant="contained">
              +
            </Button>
            <Button onClick={this.reset} variant="text">
              Reset
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">History:</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {this.state.history.map((value, index) => (
                <Chip key={index} label={value} size="small" />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

// Demo Component
const ClassComponentDemo: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Class Component
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Traditional React components using ES6 class syntax with lifecycle methods and state management.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Key Features:</Typography>
          <Typography variant="caption">
            • Lifecycle methods (componentDidMount, componentDidUpdate, etc.) • this.state for state management • this.setState for state updates • Automatic binding with arrow functions
          </Typography>
        </Alert>

        <ClassCounter />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Lifecycle Methods Demonstrated:</Typography>
          <ul>
            <li><strong>componentDidMount:</strong> Called after component mounts (check console)</li>
            <li><strong>componentDidUpdate:</strong> Called after state/props update (check console)</li>
            <li><strong>componentWillUnmount:</strong> Called before component unmounts</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">When to Use Class Components:</Typography>
          <ul>
            <li><strong>Legacy codebases:</strong> Existing class component code</li>
            <li><strong>Error boundaries:</strong> componentDidCatch is only available in classes</li>
            <li><strong>Learning:</strong> Understanding React's foundation and evolution</li>
            <li><strong>Third-party libraries:</strong> Some libraries still require class components</li>
          </ul>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 While class components are still supported, React recommends using function components with hooks for new development.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ClassComponentDemo;
