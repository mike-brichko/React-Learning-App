import React, { useId, useState } from 'react';
import { Typography, Box, Card, CardContent, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Button } from '@mui/material';

const UseIdDemo: React.FC = () => {
  // Generate unique IDs for form elements
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const genderFieldId = useId();
  const checkboxId = useId();
  const textareaId = useId();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    newsletter: false,
    comments: ''
  });

  const [generatedIds, setGeneratedIds] = useState<string[]>([]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    }));
  };

  const generateMoreIds = () => {
    const newIds = Array.from({ length: 5 }, () => 
      // This would be called within a component in real usage
      `:r${Math.random().toString(36).substring(2)}:`
    );
    setGeneratedIds(prev => [...prev, ...newIds]);
  };

  const clearIds = () => {
    setGeneratedIds([]);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          12. useId Hook
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Generates stable, unique IDs for accessibility attributes and form elements across server and client rendering.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Form with Generated IDs
          </Typography>
          
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              id={nameFieldId}
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              size="small"
              fullWidth
              helperText={`ID: ${nameFieldId}`}
            />

            <TextField
              id={emailFieldId}
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              size="small"
              fullWidth
              helperText={`ID: ${emailFieldId}`}
            />

            <TextField
              id={passwordFieldId}
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              size="small"
              fullWidth
              helperText={`ID: ${passwordFieldId}`}
            />

            <FormControl component="fieldset">
              <FormLabel id={`${genderFieldId}-label`} component="legend">
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby={`${genderFieldId}-label`}
                value={formData.gender}
                onChange={handleInputChange('gender')}
                row
              >
                <FormControlLabel 
                  value="male" 
                  control={<Radio id={`${genderFieldId}-male`} />} 
                  label="Male" 
                />
                <FormControlLabel 
                  value="female" 
                  control={<Radio id={`${genderFieldId}-female`} />} 
                  label="Female" 
                />
                <FormControlLabel 
                  value="other" 
                  control={<Radio id={`${genderFieldId}-other`} />} 
                  label="Other" 
                />
              </RadioGroup>
              <Typography variant="caption" color="text.secondary">
                Group ID: {genderFieldId}
              </Typography>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  id={checkboxId}
                  checked={formData.newsletter}
                  onChange={handleInputChange('newsletter')}
                />
              }
              label={
                <Box>
                  Subscribe to newsletter
                  <Typography variant="caption" display="block" color="text.secondary">
                    ID: {checkboxId}
                  </Typography>
                </Box>
              }
            />

            <TextField
              id={textareaId}
              label="Additional Comments"
              multiline
              rows={3}
              value={formData.comments}
              onChange={handleInputChange('comments')}
              size="small"
              fullWidth
              helperText={`ID: ${textareaId}`}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            ID Generation Demo
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button onClick={generateMoreIds} variant="contained" size="small">
              Generate IDs
            </Button>
            <Button onClick={clearIds} variant="outlined" size="small">
              Clear IDs
            </Button>
          </Box>
          
          {generatedIds.length > 0 && (
            <Box sx={{ 
              maxHeight: 150, 
              overflow: 'auto', 
              border: 1, 
              borderColor: 'divider', 
              borderRadius: 1,
              p: 1,
              bgcolor: 'grey.50'
            }}>
              {generatedIds.map((id, index) => (
                <Typography key={index} variant="caption" component="div" sx={{ fontFamily: 'monospace' }}>
                  {id}
                </Typography>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Why use useId:</Typography>
          <ul>
            <li><strong>Accessibility:</strong> Ensures proper form labeling and ARIA attributes</li>
            <li><strong>SSR Safe:</strong> IDs match between server and client rendering</li>
            <li><strong>Unique:</strong> Prevents ID collisions in complex applications</li>
            <li><strong>Stable:</strong> IDs remain consistent across re-renders</li>
          </ul>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>⚠️ Important Notes</Typography>
          <Typography variant="caption">
            Don't use useId to generate keys for list items. Keys should be based on data, not random generation.
            useId is specifically for accessibility attributes and form element associations.
          </Typography>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>🎯 Use Cases</Typography>
          <Typography variant="caption">
            Perfect for: form labels, ARIA attributes, connecting form elements,
            tooltip IDs, modal titles, and any case where you need unique identifiers for accessibility.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UseIdDemo;
