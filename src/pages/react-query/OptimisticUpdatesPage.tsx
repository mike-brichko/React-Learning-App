import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Container,
  Paper,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Chip,
} from '@mui/material';
import { Delete, Edit, Add, Undo } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ReactQueryNavigation from '../../components/ReactQueryNavigation';
import { postsApi } from '../../services/api';
import type { Post } from '../../types';

const OptimisticUpdatesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState<{ id: number; title: string } | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Fetch posts query
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getPosts,
    staleTime: 2 * 60 * 1000,
  });

  // Optimistic Create Post Mutation
  const optimisticCreateMutation = useMutation({
    mutationFn: (post: Omit<Post, 'id'>) => postsApi.createPost(post),
    onMutate: async (newPost) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts']);

      // Create optimistic post with temporary ID
      const optimisticPost = {
        ...newPost,
        id: Date.now(), // Temporary ID
        userId: 1,
      };

      // Optimistically update the cache
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        return old ? [optimisticPost, ...old] : [optimisticPost];
      });

      return { previousPosts, optimisticPost };
    },
    onSuccess: (newPost, _variables, context) => {
      // Replace the optimistic post with the real one
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        if (!old || !context) return old;
        return old.map(post => 
          post.id === context.optimisticPost.id ? newPost : post
        );
      });
      
      setNewPost({ title: '', body: '' });
      setSnackbar({ open: true, message: 'Post created successfully!', severity: 'success' });
    },
    onError: (error, _newPost, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      setSnackbar({ open: true, message: `Error creating post: ${error.message}`, severity: 'error' });
    },
  });

  // Optimistic Update Post Mutation
  const optimisticUpdateMutation = useMutation({
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
    onSuccess: () => {
      setEditingPost(null);
      setSnackbar({ open: true, message: 'Post updated successfully!', severity: 'success' });
    },
    onError: (error, _variables, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      setSnackbar({ open: true, message: `Error updating post: ${error.message}`, severity: 'error' });
    },
    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Optimistic Delete Post Mutation
  const optimisticDeleteMutation = useMutation({
    mutationFn: (postId: number) => postsApi.deletePost(postId),
    onMutate: async (deletedId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts']);

      // Optimistically remove the post from cache
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => {
        return old ? old.filter(post => post.id !== deletedId) : [];
      });

      return { previousPosts };
    },
    onSuccess: () => {
      setSnackbar({ open: true, message: 'Post deleted successfully!', severity: 'success' });
    },
    onError: (error, _deletedId, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      setSnackbar({ open: true, message: `Error deleting post: ${error.message}`, severity: 'error' });
    },
  });

  const handleOptimisticCreate = () => {
    if (newPost.title && newPost.body) {
      optimisticCreateMutation.mutate({
        title: newPost.title,
        body: newPost.body,
        userId: 1,
      });
    }
  };

  const handleOptimisticUpdate = () => {
    if (editingPost) {
      optimisticUpdateMutation.mutate({
        id: editingPost.id,
        post: { title: editingPost.title }
      });
    }
  };

  const handleOptimisticDelete = (postId: number) => {
    optimisticDeleteMutation.mutate(postId);
  };

  return (
    <Container maxWidth="lg">
      <ReactQueryNavigation currentPage="optimistic-updates" />
      
      <Typography variant="h4" gutterBottom>
        ⚡ Optimistic Updates
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Learn advanced mutation patterns that update the UI immediately for better user experience, 
        with automatic rollback on errors. Perfect for creating responsive, modern applications.
      </Typography>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          🚀 Advanced Pattern Alert
        </Typography>
        <Typography variant="body2">
          Optimistic updates assume success and update the UI immediately. If the operation fails, 
          the changes are automatically rolled back. This creates a snappy user experience but 
          requires careful error handling.
        </Typography>
      </Alert>

      {/* Create Post with Optimistic Updates */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ➕ Optimistic Post Creation
          </Typography>
          
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              How it works:
            </Typography>
            <Typography variant="caption" display="block">
              1. UI updates immediately with temporary post
            </Typography>
            <Typography variant="caption" display="block">
              2. API request happens in background
            </Typography>
            <Typography variant="caption" display="block">
              3. On success: Replace temp post with real data
            </Typography>
            <Typography variant="caption" display="block">
              4. On error: Remove temp post and show error
            </Typography>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              size="small"
              label="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label="Post Body"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              sx={{ flex: 1 }}
            />
          </Box>
          
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOptimisticCreate}
            disabled={!newPost.title || !newPost.body || optimisticCreateMutation.isPending}
          >
            {optimisticCreateMutation.isPending ? 'Creating...' : 'Create Post (Optimistic)'}
          </Button>

          <Box sx={{ mt: 2 }}>
            <Chip 
              label={`Status: ${optimisticCreateMutation.isPending ? 'Pending...' : 'Ready'}`}
              color={optimisticCreateMutation.isPending ? 'warning' : 'success'}
              size="small"
            />
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
        {/* Posts List with Optimistic Operations */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Posts with Optimistic Updates
            </Typography>

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
                  First 5 posts • Changes appear instantly
                </Typography>
                <List>
                  {postsQuery.data.slice(0, 5).map((post: Post) => (
                    <ListItem
                      key={post.id}
                      divider
                      sx={{
                        bgcolor: post.id > 1000000 ? 'warning.light' : 'transparent', // Highlight optimistic posts
                        borderRadius: 1,
                        mb: 0.5,
                      }}
                      secondaryAction={
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => setEditingPost({ id: post.id, title: post.title })}
                            disabled={optimisticUpdateMutation.isPending}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleOptimisticDelete(post.id)}
                            disabled={optimisticDeleteMutation.isPending}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            {post.title}
                            {post.id > 1000000 && (
                              <Chip label="Optimistic" size="small" color="warning" />
                            )}
                          </Box>
                        }
                        secondary={post.body.substring(0, 50) + '...'}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Edit Post with Optimistic Updates */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ✏️ Optimistic Edit
            </Typography>

            {!editingPost ? (
              <Alert severity="info">
                Click the edit button on any post to see optimistic updates in action
              </Alert>
            ) : (
              <Box>
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Editing Post ID: {editingPost.id}
                  </Typography>
                  <Typography variant="caption" display="block">
                    • Changes appear immediately in the list
                  </Typography>
                  <Typography variant="caption" display="block">
                    • Automatic rollback if update fails
                  </Typography>
                </Paper>

                <TextField
                  fullWidth
                  size="small"
                  label="Post Title"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleOptimisticUpdate}
                    disabled={optimisticUpdateMutation.isPending}
                  >
                    {optimisticUpdateMutation.isPending ? 'Updating...' : 'Update (Optimistic)'}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Undo />}
                    onClick={() => setEditingPost(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

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
              Optimistic Update Pattern:
            </Typography>
            <ul>
              <li>onMutate: Update cache immediately</li>
              <li>Snapshot previous state for rollback</li>
              <li>onError: Restore previous state</li>
              <li>onSettled: Final cleanup and refetch</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Best Practices:
            </Typography>
            <ul>
              <li>Always cancel ongoing queries first</li>
              <li>Store previous state for rollback</li>
              <li>Show visual feedback for optimistic updates</li>
              <li>Handle edge cases gracefully</li>
            </ul>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default OptimisticUpdatesPage;
