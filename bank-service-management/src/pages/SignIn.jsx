import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import heroImage from "../assets/hero.png";

function SignIn() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
    setMessage("");
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === login.email &&
      savedUser.password === login.password
    ) {
      navigate("/dashboard");
      return;
    }

    setMessage("Invalid email or password. Please check your details.");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", py: 4 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
            overflow: "hidden",
            border: "1px solid #dbe4ef",
            borderRadius: 2,
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Box
            sx={{
              p: { xs: 3, sm: 5 },
              bgcolor: "#f8fbff",
              borderRight: { md: "1px solid #dbe4ef" },
            }}
          >
            <Stack spacing={2.5} sx={{ height: "100%", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <LockRoundedIcon />
              </Box>
              <Typography component="h1" variant="h3" sx={{ fontSize: { xs: "2rem", sm: "2.6rem" } }}>
                Welcome back
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 460 }}>
                Sign in to continue managing branches, service tickets and equipment records.
              </Typography>
              <Box
                component="img"
                src={heroImage}
                alt="Service platform layers"
                sx={{
                  width: { xs: 180, sm: 240 },
                  mt: 2,
                  alignSelf: { xs: "center", md: "flex-start" },
                  filter: "drop-shadow(0 20px 32px rgba(35, 108, 201, 0.18))",
                }}
              />
            </Stack>
          </Box>

          <Box sx={{ p: { xs: 3, sm: 5 }, minWidth: 0 }}>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h5">Sign in</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                  Use the account you created in this browser.
                </Typography>
              </Box>

              {message && <Alert severity="error">{message}</Alert>}

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={login.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                endIcon={<LoginRoundedIcon />}
                onClick={handleLogin}
              >
                Login
              </Button>

              <Divider />

              <Typography variant="body2" color="text.secondary" textAlign="center">
                New to the workspace?{" "}
                <Box component={Link} to="/signup" sx={{ color: "primary.main", fontWeight: 800 }}>
                  Create an account
                </Box>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignIn;
