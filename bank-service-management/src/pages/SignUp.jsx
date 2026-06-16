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

function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Registration Successful");

    navigate("/signin");
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
          Sign Up
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />

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
            onClick={handleSignup}
          >
            Create Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignUp;