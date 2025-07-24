import React from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import {
  NavigateNext,
  NavigateBefore,
  Home,
  QueryStats,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface ReactQueryPage {
  id: string;
  title: string;
  description: string;
  path: string;
  type: 'overview' | 'queries' | 'mutations' | 'advanced';
}

const reactQueryPages: ReactQueryPage[] = [
  {
    id: 'overview',
    title: 'React Query Overview',
    description: 'Introduction to TanStack React Query concepts and benefits',
    path: '/react-query',
    type: 'overview',
  },
  {
    id: 'basic-queries',
    title: 'Basic Queries',
    description: 'Simple data fetching with caching and loading states',
    path: '/react-query/basic-queries',
    type: 'queries',
  },
  {
    id: 'dependent-queries',
    title: 'Dependent Queries',
    description: 'Queries that depend on other query results',
    path: '/react-query/dependent-queries',
    type: 'queries',
  },
  {
    id: 'mutations',
    title: 'Mutations',
    description: 'Create, update, and delete operations with React Query',
    path: '/react-query/mutations',
    type: 'mutations',
  },
  {
    id: 'optimistic-updates',
    title: 'Optimistic Updates',
    description: 'Advanced mutation patterns for better user experience',
    path: '/react-query/optimistic-updates',
    type: 'advanced',
  },
  {
    id: 'cache-management',
    title: 'Cache Management',
    description: 'Advanced caching strategies and invalidation patterns',
    path: '/react-query/cache-management',
    type: 'advanced',
  },
];

interface ReactQueryNavigationProps {
  currentPage: string;
}

const ReactQueryNavigation: React.FC<ReactQueryNavigationProps> = ({ currentPage }) => {
  const currentPageData = reactQueryPages.find(page => page.id === currentPage);
  const currentIndex = reactQueryPages.findIndex(page => page.id === currentPage);
  const previousPage = currentIndex > 0 ? reactQueryPages[currentIndex - 1] : null;
  const nextPage = currentIndex < reactQueryPages.length - 1 ? reactQueryPages[currentIndex + 1] : null;

  const generateBreadcrumbs = () => {
    const breadcrumbs = [
      {
        label: 'Home',
        path: '/',
        icon: <Home fontSize="small" />,
      },
      {
        label: 'React Query',
        path: '/react-query',
        icon: <QueryStats fontSize="small" />,
      },
    ];

    if (currentPageData && currentPageData.id !== 'overview') {
      breadcrumbs.push({
        label: currentPageData.title,
        path: currentPageData.path,
        icon: <QueryStats fontSize="small" />,
      });
    }

    return breadcrumbs;
  };

  const getPagesByType = (type: ReactQueryPage['type']) => {
    return reactQueryPages.filter(page => page.type === type);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumbs */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          {generateBreadcrumbs().map((breadcrumb) => (
            <Link
              key={breadcrumb.path}
              component={RouterLink}
              to={breadcrumb.path}
              color="inherit"
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {breadcrumb.icon}
              {breadcrumb.label}
            </Link>
          ))}
        </Breadcrumbs>
      </Paper>

      {/* Page Navigation */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {previousPage && (
          <Button
            component={RouterLink}
            to={previousPage.path}
            startIcon={<NavigateBefore />}
            variant="outlined"
            size="small"
          >
            {previousPage.title}
          </Button>
        )}
        {nextPage && (
          <Button
            component={RouterLink}
            to={nextPage.path}
            endIcon={<NavigateNext />}
            variant="outlined"
            size="small"
            sx={{ ml: 'auto' }}
          >
            {nextPage.title}
          </Button>
        )}
      </Box>

      {/* Quick Navigation Grid */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          📚 React Query Learning Path
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Overview
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {getPagesByType('overview').map((page) => (
              <Chip
                key={page.id}
                label={page.title}
                component={RouterLink}
                to={page.path}
                clickable
                color={currentPage === page.id ? 'primary' : 'default'}
                variant={currentPage === page.id ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Queries
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {getPagesByType('queries').map((page) => (
              <Chip
                key={page.id}
                label={page.title}
                component={RouterLink}
                to={page.path}
                clickable
                color={currentPage === page.id ? 'primary' : 'default'}
                variant={currentPage === page.id ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Mutations
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {getPagesByType('mutations').map((page) => (
              <Chip
                key={page.id}
                label={page.title}
                component={RouterLink}
                to={page.path}
                clickable
                color={currentPage === page.id ? 'primary' : 'default'}
                variant={currentPage === page.id ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Advanced Patterns
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {getPagesByType('advanced').map((page) => (
              <Chip
                key={page.id}
                label={page.title}
                component={RouterLink}
                to={page.path}
                clickable
                color={currentPage === page.id ? 'primary' : 'default'}
                variant={currentPage === page.id ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReactQueryNavigation;
