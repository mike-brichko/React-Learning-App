import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  TextField
} from '@mui/material';

// Function Component with Props
interface GreetingProps {
  name: string;
  age?: number;
  onGreet?: (message: string) => void;
}

const Greeting: React.FC<GreetingProps> = ({ name, age, onGreet }) => {
  const handleClick = () => {
    const message = `Hello ${name}${age ? `, you are ${age} years old` : ''}!`;
    onGreet?.(message);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Function Component Example</Typography>
        <Typography>Name: {name}</Typography>
        {age && <Typography>Age: {age}</Typography>}
        <Button onClick={handleClick} variant="contained" sx={{ mt: 1 }}>
          Greet
        </Button>
      </CardContent>
    </Card>
  );
};

const FunctionComponentDemo: React.FC = () => {
  const [greetingMessage, setGreetingMessage] = useState('');
  const [name, setName] = useState('Developer');
  const [age, setAge] = useState<number | undefined>(25);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Function Component with Props
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Modern React components using functional syntax with props and hooks for state management.
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Key Features:</Typography>
          <Typography variant="caption">
            • TypeScript interfaces for props • Optional props with default values • Event handling through props • Modern hook-based state management
          </Typography>
        </Alert>

        <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Age"
            type="number"
            value={age || ''}
            onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)}
            size="small"
            sx={{ minWidth: 80 }}
          />
        </Box>

        <Greeting
          name={name}
          age={age}
          onGreet={setGreetingMessage}
        />

        {greetingMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {greetingMessage}
          </Alert>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Advantages:</Typography>
          <ul>
            <li><strong>Simpler syntax:</strong> Less boilerplate than class components</li>
            <li><strong>Hooks support:</strong> Modern state and lifecycle management</li>
            <li><strong>Performance:</strong> Better tree-shaking and optimization</li>
            <li><strong>Testing:</strong> Easier to test pure functions</li>
            <li><strong>TypeScript:</strong> Excellent type inference and safety</li>
          </ul>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FunctionComponentDemo;
