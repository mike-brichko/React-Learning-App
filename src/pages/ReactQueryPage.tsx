import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Container,
  Paper,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Refresh, Delete, Edit } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi, userApi } from '../services/api';
import type { Post, User } from '../types';

const ReactQueryPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  // Fetch users query
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch posts query
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getPosts,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Fetch posts by user (dependent query)
  const userPostsQuery = useQuery({
    queryKey: ['posts', 'user', selectedUserId],
    queryFn: () => postsApi.getPostsByUser(selectedUserId!),
    enabled: !!selectedUserId,
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: (post: Omit<Post, 'id'>) => postsApi.createPost(post),
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setNewPost({ title: '', body: '' });
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => postsApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Update post mutation with optimistic updates
  const updatePostMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) =>
      postsApi.updatePost(id, post),
    onMutate: async ({ id, post }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts']);

      // Optimistically update the cache
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        if (!old) return [];
        return old.map((p) => (p.id === id ? { ...p, ...post } : p));
      });

      return { previousPosts };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleCreatePost = () => {
    if (newPost.title && newPost.body) {
      createPostMutation.mutate({
        title: newPost.title,
        body: newPost.body,
        userId: 1, // Default user
      });
    }
  };

  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  const handleUpdatePost = (postId: number, updates: Partial<Post>) => {
    updatePostMutation.mutate({ id: postId, post: updates });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        TanStack React Query Playground
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Interactive examples demonstrating data fetching, caching, and synchronization with React Query.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Users Query */}
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Users Query
              </Typography>
              <IconButton
                onClick={() => usersQuery.refetch()}
                disabled={usersQuery.isFetching}
              >
                <Refresh />
              </IconButton>
            </Box>

            {usersQuery.isLoading && (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            )}

            {usersQuery.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Error loading users: {usersQuery.error.message}
              </Alert>
            )}

            {usersQuery.data && (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Click a user to load their posts
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

        {/* User Posts Query (Dependent) */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Posts (Dependent Query)
            </Typography>

            {!selectedUserId && (
              <Typography variant="body2" color="text.secondary">
                Select a user to load their posts
              </Typography>
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
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Posts with Mutations */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Posts with Mutations
            </Typography>
            <Button
              startIcon={<Refresh />}
              onClick={() => postsQuery.refetch()}
              disabled={postsQuery.isFetching}
            >
              Refresh
            </Button>
          </Box>

          {/* Create Post Form */}
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="subtitle1" mb={1}>
              Create New Post
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              size="small"
              label="Body"
              multiline
              rows={2}
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleCreatePost}
              disabled={!newPost.title || !newPost.body || createPostMutation.isPending}
            >
              {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
            </Button>
          </Paper>

          {postsQuery.isLoading && (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          )}

          {postsQuery.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error loading posts: {postsQuery.error.message}
            </Alert>
          )}

          {postsQuery.data && (
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Showing first 5 posts ({postsQuery.data.length} total)
              </Typography>
              <List>
                {postsQuery.data.slice(0, 5).map((post: Post) => (
                  <ListItem
                    key={post.id}
                    divider
                    secondaryAction={
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdatePost(post.id, {
                            title: post.title + ' (Updated)'
                          })}
                          disabled={updatePostMutation.isPending}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deletePostMutation.isPending}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={post.title}
                      secondary={post.body.substring(0, 100) + '...'}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          🚀 React Query Features Demonstrated
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
              Queries:
            </Typography>
            <ul>
              <li>Automatic caching and background updates</li>
              <li>Loading and error states</li>
              <li>Dependent queries</li>
              <li>Stale time configuration</li>
              <li>Manual refetching</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Mutations:
            </Typography>
            <ul>
              <li>Create, update, delete operations</li>
              <li>Optimistic updates</li>
              <li>Cache invalidation</li>
              <li>Error handling and rollback</li>
              <li>Loading states</li>
            </ul>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 2, bgcolor: 'success.main', color: 'success.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          💡 React Query Benefits
        </Typography>
        <ul>
          <li>Eliminates boilerplate for data fetching</li>
          <li>Intelligent caching and synchronization</li>
          <li>Background updates and refetching</li>
          <li>Optimistic updates for better UX</li>
          <li>Built-in loading and error states</li>
          <li>Devtools for debugging</li>
        </ul>
      </Paper>
    </Container>
  );
};

export default ReactQueryPage;
