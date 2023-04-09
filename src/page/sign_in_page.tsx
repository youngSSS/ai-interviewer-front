import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography,
} from "@mui/material";
import googleIcon from "../google_sign_in.png";
import {serverAddr} from "../constants"

const theme = createTheme();
const GOOGLE_CLIENT_ID =
  "257803826922-p7l2c9u53568cjlipnhl7032on6vbtsc.apps.googleusercontent.com";
const GOOGLE_SIGN_IN_URI = "https://accounts.google.com/o/oauth2/auth";
const GOOGLE_REDIRECT_URI = `http://${serverAddr}/sign-in/oauth/google`;

export default function SignIn() {
  const [selectedOption, setSelectedOption] = useState("individual");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleGoogleLogin = () => {
    window.location.href = `${GOOGLE_SIGN_IN_URI}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      GOOGLE_REDIRECT_URI
    )}&response_type=code&scope=profile%20email&state=${selectedOption}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Start AI Interviewer
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Sign in as
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <FormControlLabel
                  value="individual"
                  control={
                    <Radio
                      size="small"
                      checked={selectedOption === "individual"}
                    />
                  }
                  label="individual"
                />
                <FormControlLabel
                  value="enterprise"
                  control={
                    <Radio
                      size="small"
                      checked={selectedOption === "enterprise"}
                    />
                  }
                  label="enterprise"
                />
              </RadioGroup>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleGoogleLogin}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
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
