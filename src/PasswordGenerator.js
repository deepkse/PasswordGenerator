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
  Tabs,
  Tab,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PasswordGenerator = () => {
  const [mode, setMode] = useState('password');
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [passphrase, setPassphrase] = useState('');

  const words = [
    'abacus', 'bicycle', 'cactus', 'daffodil', 'elephant', 'fandango', 'gizmo', 'harmonica',
    'igloo', 'jigsaw', 'kaleidoscope', 'lullaby', 'mango', 'noodle', 'octopus', 'penguin',
    'quasar', 'raccoon', 'sizzle', 'trombone', 'umbrella', 'volcano', 'whisker', 'xylophone',
    'yoga', 'zeppelin', 'blossom', 'crisp', 'dazzle', 'eager', 'fizzle', 'giggle', 'hustle',
    'jazzy', 'knapsack', 'lunar', 'mellow', 'nimble', 'oasis', 'plume', 'quilt', 'radiant',
    'sushi', 'tranquil', 'upbeat', 'vivid', 'waltz', 'zesty', 'aroma', 'breeze', 'cozy',
    'dewdrop', 'enchant', 'frolic', 'glimmer', 'humble', 'ignite', 'jubilant', 'kinetic',
    'luminous', 'mystique', 'nectar', 'opulent', 'pebble', 'quirky', 'ripple', 'serene',
    'twinkle', 'unique', 'velvet', 'whimsical', 'zenith', 'azure', 'blissful', 'cascade',
    'dazzling', 'effervescent', 'flutter', 'glow', 'harmonious', 'illuminate', 'jovial'
  ];

  const digits = '0123456789';
  const punctuation = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const generatePassword = () => {
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += digits;
    if (symbols) charset += punctuation;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const generatePassphrase = () => {
    let newPassphrase = '';
    const usedIndices = new Set();

    for (let i = 0; i < length; i++) {
      // Select a random word
      let wordIndex;
      do {
        wordIndex = Math.floor(Math.random() * words.length);
      } while (usedIndices.has(wordIndex));
      usedIndices.add(wordIndex);

      let word = words[wordIndex];

      // Randomly capitalize the word (33% chance)
      if (Math.random() < 0.33) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }

      // Add the word to the passphrase
      newPassphrase += word;

      // Add a random digit or punctuation (50% chance)
      if (Math.random() < 0.5) {
        const char = Math.random() < 0.5 
          ? digits.charAt(Math.floor(Math.random() * digits.length))
          : punctuation.charAt(Math.floor(Math.random() * punctuation.length));
        newPassphrase += char;
      }

      // Add a space if it's not the last word
      if (i < length - 1) {
        newPassphrase += '';
      }
    }

    setPassphrase(newPassphrase);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mode === 'password' ? password : passphrase);
  };

  const calculateStrength = () => {
    if (mode === 'passphrase') {
      // More sophisticated strength calculation for passphrases
      const wordCount = passphrase.split(' ').length;
      const hasUppercase = /[A-Z]/.test(passphrase);
      const hasDigit = /\d/.test(passphrase);
      const hasPunctuation = new RegExp(`[${punctuation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(passphrase);
      
      let strength = wordCount * 10;
      if (hasUppercase) strength += 10;
      if (hasDigit) strength += 10;
      if (hasPunctuation) strength += 10;

      return Math.min(100, strength);
    } else {
      // Existing password strength calculation
      let strength = 0;
      if (uppercase) strength += 26;
      if (lowercase) strength += 26;
      if (numbers) strength += 10;
      if (symbols) strength += 32;
      strength *= length;
      return Math.min(100, (strength / 6016) * 100);
    }
  };

  const handleGenerate = () => {
    if (mode === 'password') {
      generatePassword();
    } else {
      generatePassphrase();
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Password Generator
      </Typography>
      <Tabs value={mode} onChange={(e, newValue) => setMode(newValue)} sx={{ mb: 2 }}>
        <Tab label="Password" value="password" />
        <Tab label="Passphrase" value="passphrase" />
      </Tabs>
      <Slider
        value={length}
        onChange={(e, newValue) => setLength(newValue)}
        min={mode === 'password' ? 1 : 3}
        max={mode === 'password' ? 64 : 10}
        valueLabelDisplay="auto"
      />
      <Typography>Length: {length} {mode === 'passphrase' ? 'words' : 'characters'}</Typography>
      {mode === 'password' && (
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
      )}
      <Button variant="contained" onClick={handleGenerate} sx={{ mt: 2 }}>
        Generate
      </Button>
      <TextField
        fullWidth
        value={mode === 'password' ? password : passphrase}
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
        <Typography>Strength</Typography>
        <LinearProgress variant="determinate" value={calculateStrength()} sx={{ height: 10, borderRadius: 5 }} />
      </Box>
    </Paper>
  );
};

export default PasswordGenerator;