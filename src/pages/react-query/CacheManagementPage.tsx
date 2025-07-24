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
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  TextField,
} from '@mui/material';
import {
  Refresh,
  Clear,
  Schedule,
  Cached,
  Memory,
  Settings,
} from '@mui/icons-material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ReactQueryNavigation from '../../components/ReactQueryNavigation';
import { postsApi, userApi } from '../../services/api';
import type { Post, User } from '../../types';

const CacheManagementPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [autoRefetch, setAutoRefetch] = useState(true);
  const [staleTime, setStaleTime] = useState(30000); // 30 seconds
  const [cacheTime, setCacheTime] = useState(300000); // 5 minutes

  // Posts query with configurable cache settings
  const postsQuery = useQuery({
    queryKey: ['cached-posts'],
    queryFn: postsApi.getPosts,
    staleTime: staleTime,
    gcTime: cacheTime, // formerly cacheTime
    refetchOnWindowFocus: autoRefetch,
    refetchOnReconnect: autoRefetch,
  });

  // Users query for cache relationship demonstration
  const usersQuery = useQuery<User[]>({
    queryKey: ['cached-users'],
    queryFn: userApi.getUsers,
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
  });

  // Individual post query (dependent on posts)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const singlePostQuery = useQuery({
    queryKey: ['cached-post', selectedPostId],
    queryFn: () => postsApi.getPost(selectedPostId!),
    enabled: !!selectedPostId,
    staleTime: 120000, // 2 minutes
  });

  // Cache manipulation functions
  const handleInvalidateAll = () => {
    queryClient.invalidateQueries();
  };

  const handleInvalidatePosts = () => {
    queryClient.invalidateQueries({ queryKey: ['cached-posts'] });
  };

  const handleInvalidateUsers = () => {
    queryClient.invalidateQueries({ queryKey: ['cached-users'] });
  };

  const handleClearCache = () => {
    queryClient.clear();
  };

  const handlePrefetchPost = (postId: number) => {
    queryClient.prefetchQuery({
      queryKey: ['cached-post', postId],
      queryFn: () => postsApi.getPost(postId),
      staleTime: 120000,
    });
  };

  const handleRemoveQuery = (queryKey: (string | number)[]) => {
    queryClient.removeQueries({ queryKey });
  };

  const handleSetQueryData = () => {
    const newPost: Post = {
      id: 999,
      title: 'Manually Added Post',
      body: 'This post was added directly to the cache without an API call',
      userId: 1,
    };

    queryClient.setQueryData(['cached-posts'], (oldData: Post[] | undefined) => {
      return oldData ? [newPost, ...oldData] : [newPost];
    });
  };

  // Get cache stats
  const getCacheInfo = () => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    return {
      totalQueries: queries.length,
      activeQueries: queries.filter(q => q.getObserversCount() > 0).length,
      staleQueries: queries.filter(q => q.isStale()).length,
      fetchingQueries: queries.filter(q => q.state.fetchStatus === 'fetching').length,
    };
  };

  const cacheInfo = getCacheInfo();

  return (
    <Container maxWidth="lg">
      <ReactQueryNavigation currentPage="cache-management" />
      
      <Typography variant="h4" gutterBottom>
        🗄️ Cache Management
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Master advanced caching strategies, invalidation patterns, and performance optimization 
        techniques. Learn to control when and how your data is cached and refreshed.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          🎯 Advanced Cache Control
        </Typography>
        <Typography variant="body2">
          React Query's cache is powerful but requires understanding of stale time, garbage collection time, 
          invalidation strategies, and manual cache manipulation for optimal performance.
        </Typography>
      </Alert>

      {/* Cache Configuration */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ⚙️ Cache Configuration
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Refetch Settings:
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoRefetch}
                    onChange={(e) => setAutoRefetch(e.target.checked)}
                  />
                }
                label="Auto refetch on window focus"
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Cache Timing:
              </Typography>
              <TextField
                size="small"
                label="Stale Time (ms)"
                type="number"
                value={staleTime}
                onChange={(e) => setStaleTime(Number(e.target.value))}
                sx={{ mb: 1, width: '100%' }}
              />
              <TextField
                size="small"
                label="Garbage Collection Time (ms)"
                type="number"
                value={cacheTime}
                onChange={(e) => setCacheTime(Number(e.target.value))}
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Quick Actions:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleInvalidateAll}
            >
              Invalidate All
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleInvalidatePosts}
            >
              Invalidate Posts
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleClearCache}
            >
              Clear Cache
            </Button>
            <Button
              size="small"
              variant="contained"
              startIcon={<Memory />}
              onClick={handleSetQueryData}
            >
              Add Manual Data
            </Button>
          </Box>
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
        {/* Cache Statistics */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📊 Cache Statistics
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {cacheInfo.totalQueries}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Queries
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">
                  {cacheInfo.activeQueries}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Queries
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main">
                  {cacheInfo.staleQueries}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stale Queries
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="info.main">
                  {cacheInfo.fetchingQueries}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fetching Queries
                </Typography>
              </Paper>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Cache Behavior:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                icon={<Schedule />}
                label={`Stale Time: ${staleTime / 1000}s`}
                size="small"
                color="primary"
              />
              <Chip 
                icon={<Cached />}
                label={`GC Time: ${cacheTime / 1000}s`}
                size="small"
                color="secondary"
              />
              <Chip 
                icon={<Settings />}
                label={autoRefetch ? 'Auto Refetch: ON' : 'Auto Refetch: OFF'}
                size="small"
                color={autoRefetch ? 'success' : 'default'}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Cached Posts with Controls */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Cached Posts
            </Typography>

            {postsQuery.isLoading && (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            )}

            {postsQuery.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Error: {postsQuery.error.message}
              </Alert>
            )}

            {postsQuery.data && (
              <Box>
                <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip 
                    label={postsQuery.isStale ? 'Stale' : 'Fresh'}
                    color={postsQuery.isStale ? 'warning' : 'success'}
                    size="small"
                  />
                  <Chip 
                    label={postsQuery.isFetching ? 'Fetching' : 'Idle'}
                    color={postsQuery.isFetching ? 'info' : 'default'}
                    size="small"
                  />
                  <Button
                    size="small"
                    onClick={() => handleRemoveQuery(['cached-posts'])}
                  >
                    Remove
                  </Button>
                </Box>

                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {postsQuery.data.slice(0, 8).map((post: Post) => (
                    <ListItem
                      key={post.id}
                      divider
                      component="div"
                      sx={{
                        bgcolor: selectedPostId === post.id ? 'action.selected' : 'transparent',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                      onClick={() => setSelectedPostId(post.id)}
                      onMouseEnter={() => handlePrefetchPost(post.id)}
                    >
                      <ListItemText
                        primary={post.title}
                        secondary={`ID: ${post.id} • Hover to prefetch`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Individual Post Cache */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📄 Individual Post Cache
            </Typography>

            {!selectedPostId ? (
              <Alert severity="info">
                Click on a post above to see individual post caching in action
              </Alert>
            ) : (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Selected Post ID: {selectedPostId}
                </Typography>

                {singlePostQuery.isLoading && (
                  <Box display="flex" justifyContent="center" p={2}>
                    <CircularProgress size={24} />
                  </Box>
                )}

                {singlePostQuery.error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Error: {singlePostQuery.error.message}
                  </Alert>
                )}

                {singlePostQuery.data && (
                  <Box>
                    <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip 
                        label={singlePostQuery.isStale ? 'Stale' : 'Fresh'}
                        color={singlePostQuery.isStale ? 'warning' : 'success'}
                        size="small"
                      />
                      <Chip 
                        label={singlePostQuery.isFetching ? 'Fetching' : 'Cached'}
                        color={singlePostQuery.isFetching ? 'info' : 'default'}
                        size="small"
                      />
                    </Box>

                    <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {singlePostQuery.data.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {singlePostQuery.data.body}
                      </Typography>
                    </Paper>

                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mt: 1 }}
                      onClick={() => handleRemoveQuery(['cached-post', selectedPostId])}
                    >
                      Remove from Cache
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Users Cache */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              👥 Users Cache
            </Typography>

            {usersQuery.isLoading && (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            )}

            {usersQuery.data && (
              <Box>
                <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip 
                    label={usersQuery.isStale ? 'Stale' : 'Fresh'}
                    color={usersQuery.isStale ? 'warning' : 'success'}
                    size="small"
                  />
                  <Chip 
                    label={`${usersQuery.data.length} users`}
                    size="small"
                  />
                  <Button
                    size="small"
                    onClick={handleInvalidateUsers}
                  >
                    Invalidate
                  </Button>
                </Box>

                <List sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {usersQuery.data.slice(0, 5).map((user: User) => (
                    <ListItem key={user.id} divider>
                      <ListItemText
                        primary={user.name}
                        secondary={user.email}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🎯 Cache Management Concepts
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
              Cache Lifecycle:
            </Typography>
            <ul>
              <li><strong>Fresh:</strong> Data is considered up-to-date</li>
              <li><strong>Stale:</strong> Data needs revalidation</li>
              <li><strong>Inactive:</strong> No components using the data</li>
              <li><strong>Garbage Collected:</strong> Removed from memory</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Key Strategies:
            </Typography>
            <ul>
              <li><strong>Prefetching:</strong> Load data before it's needed</li>
              <li><strong>Invalidation:</strong> Mark data as stale to trigger refetch</li>
              <li><strong>Manual Updates:</strong> Directly modify cache data</li>
              <li><strong>Selective Removal:</strong> Remove specific queries</li>
            </ul>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CacheManagementPage;
