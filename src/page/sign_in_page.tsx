import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {FormControl, FormLabel, Radio, RadioGroup, Container, Typography} from "@mui/material";

import googleIcon from '../google_sign_in.png'

const theme = createTheme();

export default function SignIn() {
    const [selectedOption, setSelectedOption] = useState('user');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Start AI Interviewer
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Sign in as</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <FormControlLabel
                            value="user"
                            control={<Radio size="small" checked={selectedOption === 'user'} />}
                            label="user"
                        />
                        <FormControlLabel
                            value="enterprise"
                            control={<Radio size="small" checked={selectedOption === 'enterprise'} />}
                            label="enterprise"
                        />
                    </RadioGroup>
                </FormControl>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={googleIcon} width={20} alt="My custom image" />
                      <p>Continue with Google</p>
                  </div>
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}
