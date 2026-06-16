import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
} from "@mui/material";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar>
          {/* Logo */}

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#d32f2f",
            }}
          >
            COMPANY LOGO
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation */}

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Button
              sx={{
                color: "#333",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  color: "#d32f2f",
                },
              }}
            >
              Home
            </Button>

            <Button
              sx={{
                color: "#333",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  color: "#d32f2f",
                },
              }}
            >
              About Us
            </Button>

            <Button
              sx={{
                color: "#333",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  color: "#d32f2f",
                },
              }}
            >
              Contact
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/signin")}
              sx={{
                borderColor: "#d32f2f",
                color: "#d32f2f",
                ml: 2,

                "&:hover": {
                  backgroundColor: "#ffebee",
                  borderColor: "#b71c1c",
                },
              }}
            >
              Sign In
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                backgroundColor: "#d32f2f",

                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}

      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
          >
            Bank Service
            Management System
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              mb: 4,
            }}
          >
            Efficiently manage banks, branches,
            machines, service visits, spare parts
            and banking equipment operations from
            one centralized platform.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#d32f2f",

                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#d32f2f",
                color: "#d32f2f",

                "&:hover": {
                  backgroundColor: "#ffebee",
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default Home;