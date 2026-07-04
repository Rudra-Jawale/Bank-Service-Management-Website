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
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import heroImage from "../assets/hero.png";

const benefits = [
  "Role-ready dashboard access",
  "Clean bank and branch records",
  "Machine lifecycle tracking",
];

function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    setMessage("");
  };

  const handleSignup = () => {
    if (!user.name || !user.email || !user.password) {
      setMessage("Please fill in name, email and password.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/signin");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", py: 4 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            overflow: "hidden",
            border: "1px solid #dbe4ef",
            borderRadius: 2,
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Box sx={{ p: { xs: 3, sm: 5 }, minWidth: 0 }}>
            <Stack spacing={2.5}>
              <Box>
                <Typography component="h1" variant="h4">
                  Create your workspace account
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                  Set up an admin profile for the service management portal.
                </Typography>
              </Box>

              {message && <Alert severity="warning">{message}</Alert>}

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={handleSignup}
              >
                Create Account
              </Button>

              <Divider />

              <Typography variant="body2" color="text.secondary" textAlign="center">
                Already registered?{" "}
                <Box component={Link} to="/signin" sx={{ color: "primary.main", fontWeight: 800 }}>
                  Sign in
                </Box>
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              p: { xs: 3, sm: 5 },
              bgcolor: "#f8fbff",
              borderLeft: { md: "1px solid #dbe4ef" },
            }}
          >
            <Stack spacing={2.25} sx={{ height: "100%", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2,
                  bgcolor: "secondary.main",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <AccountCircleRoundedIcon />
              </Box>
              <Typography variant="h5">Ready for organized service work</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Keep location data, device status and team activity clear from day one.
              </Typography>
              <Stack spacing={1.25}>
                {benefits.map((benefit) => (
                  <Stack key={benefit} direction="row" spacing={1} alignItems="center">
                    <CheckCircleRoundedIcon color="secondary" fontSize="small" />
                    <Typography variant="body2" fontWeight={700}>
                      {benefit}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Box
                component="img"
                src={heroImage}
                alt="Layered service workspace"
                sx={{
                  width: { xs: 170, sm: 220 },
                  alignSelf: "center",
                  filter: "drop-shadow(0 20px 32px rgba(15, 159, 143, 0.18))",
                }}
              />
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignUp;
