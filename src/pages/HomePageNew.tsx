import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Build,
  Code,
  Web,
  Storage,
  Science,
  BugReport,
} from '@mui/icons-material';

const features = [
  {
    title: 'React Hooks',
    description: 'Learn and experiment with useState, useEffect, useContext, useReducer, and custom hooks',
    icon: <Build color="primary" />,
    path: '/hooks',
    topics: ['useState', 'useEffect', 'useContext', 'useReducer', 'Custom Hooks'],
  },
  {
    title: 'Component Patterns',
    description: 'Explore different React component patterns and best practices',
    icon: <Code color="primary" />,
    path: '/components',
    topics: ['Props', 'Composition', 'Render Props', 'HOCs'],
  },
  {
    title: 'Context API',
    description: 'Master React Context for state management across your application',
    icon: <Web color="primary" />,
    path: '/context',
    topics: ['Provider', 'Consumer', 'useContext', 'Multiple Contexts'],
  },
  {
    title: 'Redux Toolkit',
    description: 'Learn modern Redux with Redux Toolkit for predictable state management',
    icon: <Storage color="primary" />,
    path: '/redux',
    topics: ['Slices', 'Actions', 'Reducers', 'Middleware'],
  },
  {
    title: 'TanStack React Query',
    description: 'Master data fetching, caching, and synchronization with React Query',
    icon: <Science color="primary" />,
    path: '/react-query',
    topics: ['Queries', 'Mutations', 'Caching', 'Optimistic Updates'],
  },
  {
    title: 'Testing',
    description: 'Learn testing strategies with Vitest and React Testing Library',
    icon: <BugReport color="primary" />,
    path: '/testing',
    topics: ['Unit Tests', 'Integration Tests', 'Mocking', 'User Events'],
  },
];

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          React Learning Playground
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          A comprehensive interactive environment to learn and practice React concepts,
          patterns, and modern tools. Each section provides hands-on examples and
          exercises to master React development.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {features.map((feature) => (
          <Card
            key={feature.path}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" mb={2}>
                {feature.icon}
                <Typography variant="h5" component="h2" ml={1}>
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {feature.description}
              </Typography>
              <Box>
                {feature.topics.map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            </CardContent>
            <CardActions>
              <Button
                component={RouterLink}
                to={feature.path}
                variant="contained"
                fullWidth
              >
                Explore {feature.title}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Box mt={6} p={3} bgcolor="background.paper" borderRadius={2}>
        <Typography variant="h5" gutterBottom>
          🚀 Getting Started
        </Typography>
        <Typography variant="body1" paragraph>
          This React learning app is built with modern tools and best practices:
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              🛠️ Tech Stack
            </Typography>
            <ul>
              <li>React 18 with TypeScript</li>
              <li>Vite for fast development</li>
              <li>Material-UI for components</li>
              <li>Redux Toolkit for state management</li>
              <li>TanStack React Query for data fetching</li>
              <li>Vitest & React Testing Library for testing</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              📚 What You'll Learn
            </Typography>
            <ul>
              <li>Modern React patterns and hooks</li>
              <li>State management strategies</li>
              <li>Component composition techniques</li>
              <li>Testing methodologies</li>
              <li>Performance optimization</li>
              <li>Best practices and conventions</li>
            </ul>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
