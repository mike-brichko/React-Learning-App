import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Container,
  Paper,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
} from '@mui/material';
import { Refresh, Error } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import ReactQueryNavigation from '../../components/ReactQueryNavigation';
import { userApi } from '../../services/api';
import type { User } from '../../types';

const BasicQueriesPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Basic users query with different configurations
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  });

  // Query with custom retry logic
  const usersWithRetryQuery = useQuery({
    queryKey: ['users-retry'],
    queryFn: userApi.getUsers,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Query with refetch interval
  const usersRefetchQuery = useQuery({
    queryKey: ['users-refetch'],
    queryFn: userApi.getUsers,
    refetchInterval: 30000, // 30 seconds
    refetchIntervalInBackground: false,
  });

  return (
    <Container maxWidth="lg">
      <ReactQueryNavigation currentPage="basic-queries" />
      
      <Typography variant="h4" gutterBottom>
        🔍 Basic Queries
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Learn the fundamentals of data fetching with React Query. Explore caching, 
        loading states, error handling, and automatic background updates.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          📚 What You'll Learn
        </Typography>
        <ul>
          <li>Basic query syntax and configuration</li>
          <li>Loading and error states</li>
          <li>Caching with staleTime and gcTime</li>
          <li>Retry logic and error recovery</li>
          <li>Background refetching</li>
        </ul>
      </Alert>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Basic Query */}
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Basic Users Query
              </Typography>
              <IconButton
                onClick={() => usersQuery.refetch()}
                disabled={usersQuery.isFetching}
              >
                <Refresh />
              </IconButton>
            </Box>

            <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Configuration:
              </Typography>
              <Typography variant="caption" display="block">
                • staleTime: 5 minutes
              </Typography>
              <Typography variant="caption" display="block">
                • gcTime: 10 minutes
              </Typography>
            </Paper>

            {usersQuery.isLoading && (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            )}

            {usersQuery.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Error />
                  Error loading users: {usersQuery.error.message}
                </Box>
              </Alert>
            )}

            {usersQuery.data && (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Click a user to see selection (total: {usersQuery.data.length})
                </Typography>
                <Box>
                  {usersQuery.data.slice(0, 5).map((user: User) => (
                    <Chip
                      key={user.id}
                      label={user.name}
                      onClick={() => setSelectedUserId(user.id)}
                      color={selectedUserId === user.id ? 'primary' : 'default'}
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Box mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    Status: {usersQuery.isFetching ? 'Fetching...' : 'Fresh'}
                    {usersQuery.isStale && ' (Stale)'}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Query with Retry Logic */}
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Query with Retry Logic
              </Typography>
              <IconButton
                onClick={() => usersWithRetryQuery.refetch()}
                disabled={usersWithRetryQuery.isFetching}
              >
                <Refresh />
              </IconButton>
            </Box>

            <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Configuration:
              </Typography>
              <Typography variant="caption" display="block">
                • retry: 3 attempts
              </Typography>
              <Typography variant="caption" display="block">
                • retryDelay: Exponential backoff
              </Typography>
            </Paper>

            {usersWithRetryQuery.isLoading && (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            )}

            {usersWithRetryQuery.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Failed after 3 retries: {usersWithRetryQuery.error.message}
              </Alert>
            )}

            {usersWithRetryQuery.data && (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Users loaded successfully ({usersWithRetryQuery.data.length})
                </Typography>
                <List dense>
                  {usersWithRetryQuery.data.slice(0, 3).map((user: User) => (
                    <ListItem key={user.id} divider>
                      <ListItemText
                        primary={user.name}
                        secondary={user.email}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    Retry count: {usersWithRetryQuery.failureCount || 0}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Background Refetch Query */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Background Refetch Query
            </Typography>
            <Button
              startIcon={<Refresh />}
              onClick={() => usersRefetchQuery.refetch()}
              disabled={usersRefetchQuery.isFetching}
            >
              Manual Refetch
            </Button>
          </Box>

          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Configuration:
            </Typography>
            <Typography variant="caption" display="block">
              • refetchInterval: 30 seconds
            </Typography>
            <Typography variant="caption" display="block">
              • refetchIntervalInBackground: false
            </Typography>
          </Paper>

          {usersRefetchQuery.isLoading && (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          )}

          {usersRefetchQuery.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error with background refetch: {usersRefetchQuery.error.message}
            </Alert>
          )}

          {usersRefetchQuery.data && (
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                This query automatically refetches every 30 seconds when the tab is active
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Users loaded: {usersRefetchQuery.data.length}
              </Typography>
              
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Status: {usersRefetchQuery.isFetching ? 'Background fetching...' : 'Idle'}
                  {usersRefetchQuery.dataUpdatedAt && (
                    <span> | Last updated: {new Date(usersRefetchQuery.dataUpdatedAt).toLocaleTimeString()}</span>
                  )}
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, bgcolor: 'success.main', color: 'success.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Key Concepts Covered
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Query Configuration:
            </Typography>
            <ul>
              <li>queryKey: Unique identifier for caching</li>
              <li>queryFn: Function that fetches the data</li>
              <li>staleTime: How long data stays fresh</li>
              <li>gcTime: How long to keep unused data in cache</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Error Handling & Retries:
            </Typography>
            <ul>
              <li>retry: Number of retry attempts</li>
              <li>retryDelay: Delay between retries</li>
              <li>Error states and recovery</li>
              <li>Background refetching strategies</li>
            </ul>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BasicQueriesPage;
