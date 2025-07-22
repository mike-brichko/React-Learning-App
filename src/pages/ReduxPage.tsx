import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Divider,
  Container,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  clearHistory,
} from '../store/slices/counterSlice';
import {
  setCurrentUser,
  logout,
  addUser,
  removeUser,
} from '../store/slices/userSlice';
import type { User } from '../types';

const ReduxPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter);
  const user = useAppSelector((state) => state.user);
  
  const [incrementAmount, setIncrementAmount] = useState(1);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(incrementAmount));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
      };
      dispatch(addUser(user));
      setNewUser({ name: '', email: '' });
    }
  };

  const handleSetCurrentUser = (user: User) => {
    dispatch(setCurrentUser(user));
  };

  const handleRemoveUser = (userId: number) => {
    dispatch(removeUser(userId));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Redux Toolkit Playground
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Interactive examples demonstrating Redux Toolkit for state management.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
        }}
      >
        {/* Counter Slice */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Counter Slice
            </Typography>
            
            <Box mb={2}>
              <Typography variant="subtitle2">Current Value</Typography>
              <Typography variant="h4" color="primary" my={1}>
                {counter.value}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Button
                variant="outlined"
                startIcon={<Remove />}
                onClick={() => dispatch(decrement())}
              >
                Decrement
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => dispatch(increment())}
              >
                Increment
              </Button>
              <Button
                variant="outlined"
                onClick={() => dispatch(reset())}
              >
                Reset
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" mb={1}>
              Increment by Amount
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <TextField
                size="small"
                type="number"
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(Number(e.target.value))}
                sx={{ width: 100 }}
              />
              <Button
                variant="outlined"
                onClick={handleIncrementByAmount}
              >
                Add {incrementAmount}
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" mb={1}>
              History
            </Typography>
            <Box mb={2}>
              {counter.history.map((value, index) => (
                <Chip
                  key={index}
                  label={value}
                  size="small"
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
            <Button
              size="small"
              variant="outlined"
              onClick={() => dispatch(clearHistory())}
            >
              Clear History
            </Button>
          </CardContent>
        </Card>

        {/* User Slice */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Management Slice
            </Typography>

            {user.currentUser ? (
              <Box mb={2}>
                <Alert severity="success">
                  <Typography variant="subtitle2">Current User</Typography>
                  <Typography variant="body2">
                    {user.currentUser.name} ({user.currentUser.email})
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => dispatch(logout())}
                    sx={{ mt: 1 }}
                  >
                    Logout
                  </Button>
                </Alert>
              </Box>
            ) : (
              <Alert severity="info" sx={{ mb: 2 }}>
                No user logged in
              </Alert>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" mb={1}>
              Add New User
            </Typography>
            <Box mb={2}>
              <TextField
                fullWidth
                size="small"
                label="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                sx={{ mb: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email}
              >
                Add User
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" mb={1}>
              Users ({user.users.length})
            </Typography>
            <List dense>
              {user.users.map((u) => (
                <ListItem
                  key={u.id}
                  secondaryAction={
                    <Box>
                      <Button
                        size="small"
                        onClick={() => handleSetCurrentUser(u)}
                        disabled={user.currentUser?.id === u.id}
                      >
                        Login
                      </Button>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveUser(u.id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={u.name}
                    secondary={u.email}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          🛠️ Redux Toolkit Features Demonstrated
        </Typography>
        <ul>
          <li><strong>createSlice:</strong> Simplified reducer and action creation</li>
          <li><strong>Immer Integration:</strong> Mutative updates that are actually immutable</li>
          <li><strong>Action Creators:</strong> Automatically generated from slice reducers</li>
          <li><strong>Type Safety:</strong> Full TypeScript integration</li>
          <li><strong>DevTools:</strong> Built-in Redux DevTools integration</li>
          <li><strong>Async Actions:</strong> Ready for createAsyncThunk usage</li>
        </ul>
      </Paper>

      <Paper sx={{ p: 3, mt: 2, bgcolor: 'info.main', color: 'info.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          💡 Redux Best Practices
        </Typography>
        <ul>
          <li>Keep state normalized and flat</li>
          <li>Use Redux Toolkit's createSlice for reducers</li>
          <li>Implement proper TypeScript types</li>
          <li>Use selectors for derived state</li>
          <li>Keep business logic in reducers, not components</li>
          <li>Use middleware for side effects</li>
        </ul>
      </Paper>
    </Container>
  );
};

export default ReduxPage;
