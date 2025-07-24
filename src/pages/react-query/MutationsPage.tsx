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
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ReactQueryNavigation from '../../components/ReactQueryNavigation';
import { postsApi } from '../../services/api';
import type { Post } from '../../types';

const MutationsPage: React.FC = () => {
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

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: (post: Omit<Post, 'id'>) => postsApi.createPost(post),
    onSuccess: (newPost) => {
      // Update the cache with the new post
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        return oldPosts ? [newPost, ...oldPosts] : [newPost];
      });
      
      setNewPost({ title: '', body: '' });
      setSnackbar({ open: true, message: 'Post created successfully!', severity: 'success' });
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error creating post: ${error.message}`, severity: 'error' });
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => postsApi.deletePost(postId),
    onSuccess: (_, deletedPostId) => {
      // Remove the post from cache
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        return oldPosts ? oldPosts.filter(post => post.id !== deletedPostId) : [];
      });
      
      setSnackbar({ open: true, message: 'Post deleted successfully!', severity: 'success' });
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error deleting post: ${error.message}`, severity: 'error' });
    },
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) =>
      postsApi.updatePost(id, post),
    onSuccess: (updatedPost) => {
      // Update the specific post in cache
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        return oldPosts ? oldPosts.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        ) : [];
      });
      
      setEditingPost(null);
      setSnackbar({ open: true, message: 'Post updated successfully!', severity: 'success' });
    },
    onError: (error) => {
      setSnackbar({ open: true, message: `Error updating post: ${error.message}`, severity: 'error' });
    },
  });

  // Multiple mutations at once
  const bulkDeleteMutation = useMutation({
    mutationFn: async (postIds: number[]) => {
      // Delete multiple posts
      await Promise.all(postIds.map(id => postsApi.deletePost(id)));
      return postIds;
    },
    onSuccess: (deletedIds) => {
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        return oldPosts ? oldPosts.filter(post => !deletedIds.includes(post.id)) : [];
      });
      
      setSnackbar({ open: true, message: `${deletedIds.length} posts deleted!`, severity: 'success' });
    },
  });

  const handleCreatePost = () => {
    if (newPost.title && newPost.body) {
      createPostMutation.mutate({
        title: newPost.title,
        body: newPost.body,
        userId: 1,
      });
    }
  };

  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      updatePostMutation.mutate({
        id: editingPost.id,
        post: { title: editingPost.title }
      });
    }
  };

  const handleBulkDelete = () => {
    const firstThreeIds = postsQuery.data?.slice(0, 3).map(post => post.id) || [];
    if (firstThreeIds.length > 0) {
      bulkDeleteMutation.mutate(firstThreeIds);
    }
  };

  return (
    <Container maxWidth="lg">
      <ReactQueryNavigation currentPage="mutations" />
      
      <Typography variant="h4" gutterBottom>
        🔄 Mutations
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Learn how to perform create, update, and delete operations with React Query mutations. 
        Understand cache updates, loading states, and error handling.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          📚 What You'll Learn
        </Typography>
        <ul>
          <li>Basic mutation syntax and usage</li>
          <li>Manual cache updates with setQueryData</li>
          <li>Loading and error state handling</li>
          <li>Success and error callbacks</li>
          <li>Bulk operations and complex mutations</li>
        </ul>
      </Alert>

      {/* Create Post */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ➕ Create New Post
          </Typography>
          
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Mutation features:
            </Typography>
            <Typography variant="caption" display="block">
              • Manual cache update with setQueryData
            </Typography>
            <Typography variant="caption" display="block">
              • Success/error callbacks
            </Typography>
            <Typography variant="caption" display="block">
              • Loading state management
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
            onClick={handleCreatePost}
            disabled={!newPost.title || !newPost.body || createPostMutation.isPending}
          >
            {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
          </Button>
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
        {/* Posts List with Individual Operations */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Posts Management
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
                  First 5 posts ({postsQuery.data.length} total)
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
                            onClick={() => setEditingPost({ id: post.id, title: post.title })}
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
                        secondary={post.body.substring(0, 50) + '...'}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    Mutation Status: 
                    {deletePostMutation.isPending && ' Deleting...'}
                    {updatePostMutation.isPending && ' Updating...'}
                    {!deletePostMutation.isPending && !updatePostMutation.isPending && ' Ready'}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Edit Post */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ✏️ Edit Post
            </Typography>

            {!editingPost ? (
              <Alert severity="info">
                Click the edit button on any post to start editing
              </Alert>
            ) : (
              <Box>
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Editing Post ID: {editingPost.id}
                  </Typography>
                  <Typography variant="caption" display="block">
                    • Optimistic updates available
                  </Typography>
                  <Typography variant="caption" display="block">
                    • Cache automatically updated
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
                    onClick={handleUpdatePost}
                    disabled={updatePostMutation.isPending}
                  >
                    {updatePostMutation.isPending ? 'Updating...' : 'Update'}
                  </Button>
                  <Button
                    variant="outlined"
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

      {/* Bulk Operations */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔄 Bulk Operations
          </Typography>
          
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Advanced mutation pattern:
            </Typography>
            <Typography variant="caption" display="block">
              • Multiple API calls with Promise.all
            </Typography>
            <Typography variant="caption" display="block">
              • Single mutation for multiple operations
            </Typography>
            <Typography variant="caption" display="block">
              • Batch cache updates
            </Typography>
          </Paper>

          <Button
            variant="contained"
            color="warning"
            onClick={handleBulkDelete}
            disabled={bulkDeleteMutation.isPending || !postsQuery.data?.length}
          >
            {bulkDeleteMutation.isPending ? 'Deleting...' : 'Delete First 3 Posts'}
          </Button>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This will delete the first 3 posts in a single mutation
          </Typography>
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
              Mutation Basics:
            </Typography>
            <ul>
              <li>mutationFn: Function that performs the operation</li>
              <li>onSuccess/onError: Callback handlers</li>
              <li>isPending: Loading state tracking</li>
              <li>Manual cache updates with setQueryData</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Advanced Patterns:
            </Typography>
            <ul>
              <li>Bulk operations with Promise.all</li>
              <li>Complex cache manipulations</li>
              <li>Error recovery strategies</li>
              <li>Optimistic vs pessimistic updates</li>
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

export default MutationsPage;
