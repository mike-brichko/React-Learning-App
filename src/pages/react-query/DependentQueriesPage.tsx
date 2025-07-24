import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ReactQueryNavigation from '../../components/ReactQueryNavigation';
import { userApi, postsApi } from '../../services/api';
import type { User, Post } from '../../types';

const DependentQueriesPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // First query - independent
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
    staleTime: 5 * 60 * 1000,
  });

  // Second query - depends on the first query's result
  const userPostsQuery = useQuery({
    queryKey: ['posts', 'user', selectedUserId],
    queryFn: () => postsApi.getPostsByUser(selectedUserId!),
    enabled: !!selectedUserId, // Only run when selectedUserId exists
  });

  // Third query - depends on second query having data
  const firstPostCommentsQuery = useQuery({
    queryKey: ['comments', 'post', userPostsQuery.data?.[0]?.id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${userPostsQuery.data![0].id}/comments`).then(res => res.json()),
    enabled: !!userPostsQuery.data && userPostsQuery.data.length > 0,
  });

  // Parallel dependent queries example
  const userDetailsQueries = useQuery({
    queryKey: ['user-details', selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return null;
      
      // Fetch user details and their albums in parallel
      const [user, albums] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`).then(res => res.json()),
        fetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}/albums`).then(res => res.json())
      ]);
      
      return { user, albums };
    },
    enabled: !!selectedUserId,
  });

  return (
    <Container maxWidth="lg">
      <ReactQueryNavigation currentPage="dependent-queries" />
      
      <Typography variant="h4" gutterBottom>
        🔗 Dependent Queries
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Learn how to chain queries that depend on each other's results. Master the `enabled` 
        option and understand when and how dependent queries execute.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          📚 What You'll Learn
        </Typography>
        <ul>
          <li>Using the `enabled` option to control query execution</li>
          <li>Chaining queries with dependent data</li>
          <li>Parallel vs sequential dependent queries</li>
          <li>Loading states in dependent query chains</li>
          <li>Error handling in query dependencies</li>
        </ul>
      </Alert>

      {/* User Selection */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            👤 Step 1: Select a User
          </Typography>
          
          {usersQuery.isLoading && (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          )}

          {usersQuery.error && (
            <Alert severity="error">
              Error loading users: {usersQuery.error.message}
            </Alert>
          )}

          {usersQuery.data && (
            <Box>
              <FormControl sx={{ minWidth: 200, mb: 2 }}>
                <InputLabel>Select User</InputLabel>
                <Select
                  value={selectedUserId || ''}
                  onChange={(e) => setSelectedUserId(e.target.value as number)}
                  label="Select User"
                >
                  {usersQuery.data.map((user: User) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="body2" color="text.secondary">
                Selecting a user will trigger the dependent queries below
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        {/* User Posts Query */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Step 2: User's Posts
            </Typography>
            
            <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Query Configuration:
              </Typography>
              <Typography variant="caption" display="block">
                • enabled: !!selectedUserId
              </Typography>
              <Typography variant="caption" display="block">
                • queryKey: ['posts', 'user', {selectedUserId || 'none'}]
              </Typography>
            </Paper>

            {!selectedUserId && (
              <Alert severity="info">
                This query is disabled until a user is selected
              </Alert>
            )}

            {selectedUserId && userPostsQuery.isLoading && (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            )}

            {selectedUserId && userPostsQuery.error && (
              <Alert severity="error">
                Error loading posts: {userPostsQuery.error.message}
              </Alert>
            )}

            {selectedUserId && userPostsQuery.data && (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Posts by User {selectedUserId} ({userPostsQuery.data.length})
                </Typography>
                <List dense>
                  {userPostsQuery.data.slice(0, 3).map((post: Post) => (
                    <ListItem key={post.id} divider>
                      <ListItemText
                        primary={post.title}
                        secondary={post.body.substring(0, 50) + '...'}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box mt={1}>
                  <Chip 
                    label={`Query Status: ${userPostsQuery.isFetching ? 'Fetching' : 'Success'}`}
                    color="success"
                    size="small"
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* First Post Comments Query */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💬 Step 3: First Post Comments
            </Typography>
            
            <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Query Configuration:
              </Typography>
              <Typography variant="caption" display="block">
                • enabled: userPostsQuery.data?.length {'>'} 0
              </Typography>
              <Typography variant="caption" display="block">
                • Depends on posts query completing
              </Typography>
            </Paper>

            {!userPostsQuery.data && (
              <Alert severity="info">
                This query waits for posts to load first
              </Alert>
            )}

            {userPostsQuery.data && userPostsQuery.data.length === 0 && (
              <Alert severity="warning">
                User has no posts, so no comments to fetch
              </Alert>
            )}

            {firstPostCommentsQuery.isLoading && (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            )}

            {firstPostCommentsQuery.error && (
              <Alert severity="error">
                Error loading comments: {firstPostCommentsQuery.error.message}
              </Alert>
            )}

            {firstPostCommentsQuery.data && (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Comments on "{userPostsQuery.data?.[0]?.title?.substring(0, 30)}..."
                </Typography>
                <List dense>
                  {firstPostCommentsQuery.data.slice(0, 3).map((comment: any) => (
                    <ListItem key={comment.id} divider>
                      <ListItemText
                        primary={comment.name}
                        secondary={comment.body.substring(0, 60) + '...'}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box mt={1}>
                  <Chip 
                    label={`${firstPostCommentsQuery.data.length} comments loaded`}
                    color="primary"
                    size="small"
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Parallel Dependent Query */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ⚡ Parallel Dependent Query: User Details & Albums
          </Typography>
          
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              This query fetches user details and albums in parallel once a user is selected:
            </Typography>
            <Typography variant="caption" display="block">
              • Both requests start simultaneously
            </Typography>
            <Typography variant="caption" display="block">
              • Uses Promise.all() for parallel execution
            </Typography>
          </Paper>

          {!selectedUserId && (
            <Alert severity="info">
              Select a user to see their details and albums loaded in parallel
            </Alert>
          )}

          {selectedUserId && userDetailsQueries.isLoading && (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          )}

          {selectedUserId && userDetailsQueries.error && (
            <Alert severity="error">
              Error loading user details: {userDetailsQueries.error.message}
            </Alert>
          )}

          {selectedUserId && userDetailsQueries.data && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  User Details
                </Typography>
                <Typography variant="body2">
                  Name: {userDetailsQueries.data.user.name}
                </Typography>
                <Typography variant="body2">
                  Email: {userDetailsQueries.data.user.email}
                </Typography>
                <Typography variant="body2">
                  Website: {userDetailsQueries.data.user.website}
                </Typography>
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Albums
                </Typography>
                <Typography variant="body2">
                  Total Albums: {userDetailsQueries.data.albums.length}
                </Typography>
                {userDetailsQueries.data.albums.slice(0, 2).map((album: any) => (
                  <Typography key={album.id} variant="caption" display="block">
                    • {album.title}
                  </Typography>
                ))}
              </Paper>
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
              Query Dependencies:
            </Typography>
            <ul>
              <li>enabled option for conditional queries</li>
              <li>Sequential query execution</li>
              <li>Dependent query keys</li>
              <li>Loading state management</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Advanced Patterns:
            </Typography>
            <ul>
              <li>Parallel dependent queries</li>
              <li>Error handling in chains</li>
              <li>Dynamic query keys</li>
              <li>Query invalidation chains</li>
            </ul>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default DependentQueriesPage;
