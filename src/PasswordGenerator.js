import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  LinearProgress,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const calculateStrength = () => {
    let strength = 0;
    if (uppercase) strength += 26;
    if (lowercase) strength += 26;
    if (numbers) strength += 10;
    if (symbols) strength += 32;
    strength *= length;
    return Math.min(100, (strength / 6016) * 100);
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Password Generator
      </Typography>
      <Slider
        value={length}
        onChange={(e, newValue) => setLength(newValue)}
        min={1}
        max={64}
        valueLabelDisplay="auto"
      />
      <Typography>Length: {length}</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />}
          label="Uppercase"
        />
        <FormControlLabel
          control={<Checkbox checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />}
            label="Lowercase"
          />
          <FormControlLabel
            control={<Checkbox checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />}
            label="Numbers"
          />
          <FormControlLabel
            control={<Checkbox checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />}
            label="Symbols"
          />
        </FormGroup>
        <Button variant="contained" onClick={generatePassword} sx={{ mt: 2 }}>
          Generate
        </Button>
        <TextField
          fullWidth
          value={password}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Button onClick={copyToClipboard}>
                <ContentCopyIcon />
              </Button>
            ),
          }}
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 2 }}>
          <Typography>Password Strength</Typography>
          <LinearProgress variant="determinate" value={calculateStrength()} sx={{ height: 10, borderRadius: 5 }} />
        </Box>
      </Paper>
    );
  };
  
  export default PasswordGenerator;