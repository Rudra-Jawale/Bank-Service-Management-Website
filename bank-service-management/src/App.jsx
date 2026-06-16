import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Banks from "./pages/Banks";
import Branches from "./pages/Branches";
import Machines from "./pages/Machines";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import { Box } from "@mui/material";

function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "#f5f7fa",
        }}
      >
        <Navbar />

        <Box p={3}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Portal */}

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
  );
}

export default App;