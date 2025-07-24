import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import { 
  Cached, 
  Timeline, 
  SwapHoriz, 
  Speed, 
  Storage,
  NavigateNext 
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import ReactQueryNavigation from '../components/ReactQueryNavigation';

const ReactQueryPage: React.FC = () => {
  const learningModules = [
    {
      title: 'Basic Queries',
      description: 'Learn the fundamentals of data fetching with caching, loading states, and error handling.',
      path: '/react-query/basic-queries',
      icon: <Cached />,
      concepts: ['Query syntax', 'Loading states', 'Error handling', 'Caching strategies'],
      difficulty: 'Beginner',
      color: 'primary',
    },
    {
      title: 'Dependent Queries',
      description: 'Master queries that depend on other query results using the enabled option.',
      path: '/react-query/dependent-queries',
      icon: <Timeline />,
      concepts: ['Enabled option', 'Query chaining', 'Sequential execution', 'Parallel queries'],
      difficulty: 'Intermediate',
      color: 'secondary',
    },
    {
      title: 'Mutations',
      description: 'Perform create, update, and delete operations with proper cache management.',
      path: '/react-query/mutations',
      icon: <SwapHoriz />,
      concepts: ['CRUD operations', 'Cache updates', 'Loading states', 'Error handling'],
      difficulty: 'Intermediate',
      color: 'success',
    },
    {
      title: 'Optimistic Updates',
      description: 'Advanced mutation patterns for better user experience with optimistic updates.',
      path: '/react-query/optimistic-updates',
      icon: <Speed />,
      concepts: ['Optimistic updates', 'Rollback strategies', 'Complex mutations', 'UX patterns'],
      difficulty: 'Advanced',
      color: 'warning',
    },
    {
      title: 'Cache Management',
      description: 'Advanced caching strategies, invalidation patterns, and performance optimization.',
      path: '/react-query/cache-management',
      icon: <Storage />,
      concepts: ['Cache invalidation', 'Background updates', 'Memory management', 'Performance'],
      difficulty: 'Advanced',
      color: 'error',
    },
  ];

  return (
    <Container maxWidth="lg">
      <ReactQueryNavigation currentPage="overview" />
      
      <Typography variant="h4" gutterBottom>
        🚀 TanStack React Query Learning Path
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Master modern data fetching in React with TanStack React Query. Learn caching, 
        synchronization, mutations, and advanced patterns through interactive examples.
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          🎯 What You'll Master
        </Typography>
        <Typography variant="body2">
          This comprehensive guide covers everything from basic queries to advanced patterns like 
          optimistic updates and complex cache management. Each module builds upon the previous one, 
          providing hands-on examples and real-world scenarios.
        </Typography>
      </Alert>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {learningModules.map((module) => (
          <Card 
            key={module.path}
            sx={{ 
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Box 
                  sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: `${module.color}.light`,
                    color: `${module.color}.main`,
                    mr: 2 
                  }}
                >
                  {module.icon}
                </Box>
                <Box flex={1}>
                  <Typography variant="h6" gutterBottom>
                    {module.title}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      px: 1, 
                      py: 0.5, 
                      borderRadius: 1, 
                      bgcolor: `${module.color}.light`,
                      color: `${module.color}.main`,
                    }}
                  >
                    {module.difficulty}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" paragraph>
                {module.description}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Key Concepts:
              </Typography>
              <Box sx={{ mb: 2 }}>
                {module.concepts.map((concept) => (
                  <Typography key={concept} variant="caption" display="block" color="text.secondary">
                    • {concept}
                  </Typography>
                ))}
              </Box>

              <Button
                component={RouterLink}
                to={module.path}
                variant="contained"
                endIcon={<NavigateNext />}
                fullWidth
                sx={{ mt: 'auto' }}
              >
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Paper sx={{ p: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          🚀 React Query Features Overview
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Core Features:
            </Typography>
            <ul>
              <li>Automatic caching and background updates</li>
              <li>Intelligent request deduplication</li>
              <li>Loading and error states out of the box</li>
              <li>Stale-while-revalidate strategy</li>
              <li>Window focus refetching</li>
              <li>Network status awareness</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom color="secondary">
              Advanced Capabilities:
            </Typography>
            <ul>
              <li>Optimistic updates for better UX</li>
              <li>Infinite queries for pagination</li>
              <li>Parallel and dependent queries</li>
              <li>Cache invalidation strategies</li>
              <li>DevTools for debugging</li>
              <li>TypeScript support throughout</li>
            </ul>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 3, bgcolor: 'success.main', color: 'success.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          💡 Why React Query?
        </Typography>
        <Typography variant="body2" paragraph>
          React Query eliminates the complexity of manual data fetching, caching, and synchronization. 
          It provides a declarative approach to server state management that scales from simple queries 
          to complex applications with thousands of components.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              🎯 Better UX
            </Typography>
            <Typography variant="body2">
              Instant loading states, background updates, and optimistic updates create seamless user experiences.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              ⚡ Performance
            </Typography>
            <Typography variant="body2">
              Smart caching, request deduplication, and background refetching optimize your app's performance.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              🛠️ Developer Experience
            </Typography>
            <Typography variant="body2">
              Less boilerplate, excellent TypeScript support, and powerful DevTools improve productivity.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReactQueryPage;
