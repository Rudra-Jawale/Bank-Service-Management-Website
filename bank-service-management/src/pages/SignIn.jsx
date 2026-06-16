import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      savedUser &&
      savedUser.email === login.email &&
      savedUser.password === login.password
    ) {
      alert("Login Successful");

      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          mt: 10,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
        >
          Sign In
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          onChange={handleChange}
        />

        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignIn;