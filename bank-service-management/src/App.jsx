import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Banks from "./pages/Banks";
import Branches from "./pages/Branches";
import Machines from "./pages/Machines";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const drawerWidth = 264;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#236cc9",
      dark: "#174f96",
    },
    secondary: {
      main: "#0f9f8f",
    },
    error: {
      main: "#d4493f",
    },
    background: {
      default: "#f6f8fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#162033",
      secondary: "#64748b",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Inter, ui-sans-serif, system-ui, Segoe UI, sans-serif",
    h1: { fontWeight: 800, letterSpacing: 0 },
    h2: { fontWeight: 800, letterSpacing: 0 },
    h3: { fontWeight: 800, letterSpacing: 0 },
    h4: { fontWeight: 800, letterSpacing: 0 },
    h5: { fontWeight: 700, letterSpacing: 0 },
    h6: { fontWeight: 700, letterSpacing: 0 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 40,
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Navbar onMenuClick={() => setMobileOpen(true)} />

        <Box
          component="main"
          sx={{
            px: { xs: 2, sm: 3, lg: 4 },
            py: { xs: 2, sm: 3 },
            maxWidth: 1440,
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          <Route
            path="/banks"
            element={
              <AdminLayout>
                <Banks />
              </AdminLayout>
            }
          />

          <Route
            path="/branches"
            element={
              <AdminLayout>
                <Branches />
              </AdminLayout>
            }
          />

          <Route
            path="/machines"
            element={
              <AdminLayout>
                <Machines />
              </AdminLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
