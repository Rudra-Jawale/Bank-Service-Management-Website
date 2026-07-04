import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import heroImage from "../assets/hero.png";

const highlights = [
  "Bank and branch registry",
  "Machine service lifecycle",
  "Technician-ready operations",
];

const capabilities = [
  {
    title: "Service visibility",
    text: "Follow installations, breakdown calls, spare needs and resolution status from one calm workspace.",
    icon: <TimelineRoundedIcon />,
  },
  {
    title: "Secure operations",
    text: "Keep teams aligned with authenticated access and clean records for each banking location.",
    icon: <ShieldRoundedIcon />,
  },
  {
    title: "Faster decisions",
    text: "Use focused dashboards and searchable tables to find the next action without digging.",
    icon: <SpeedRoundedIcon />,
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "transparent" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.9)",
          color: "text.primary",
          borderBottom: "1px solid #dbe4ef",
          backdropFilter: "blur(18px)",
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", gap: 2 }}>
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                bgcolor: "primary.main",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              NC
            </Box>
            <Typography variant="h6" noWrap>
              Bank Service Management
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button href="#capabilities">Capabilities</Button>
            <Button href="#coverage">Coverage</Button>
            <Button onClick={() => navigate("/signin")}>Sign In</Button>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Start
            </Button>
          </Stack>

          <IconButton sx={{ display: { xs: "inline-flex", md: "none" } }}>
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(320px, 0.95fr)" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
            minHeight: { md: "calc(100vh - 168px)" },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Chip
              label="Lightweight operations suite"
              color="primary"
              variant="outlined"
              sx={{ bgcolor: "#fff", fontWeight: 800 }}
            />
            <Typography
              component="h1"
              variant="h2"
              sx={{
                mt: 2.5,
                maxWidth: 760,
                fontSize: { xs: "2.25rem", sm: "3.1rem", md: "4.1rem" },
                lineHeight: { xs: 1.12, md: 1.04 },
              }}
            >
              Bank Service Management System
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mt: 2.5, maxWidth: 680, lineHeight: 1.65 }}
            >
              Manage banks, branches, machines and service activity with a clear light interface built for daily operational work.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mt: 4, maxWidth: { xs: 420, sm: "none" } }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate("/signin")}
              >
                Open Dashboard
              </Button>
              <Button variant="outlined" size="large" href="#capabilities">
                View Capabilities
              </Button>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.25, sm: 2 }}
              sx={{ mt: 4 }}
            >
              {highlights.map((item) => (
                <Stack key={item} direction="row" spacing={0.75} alignItems="center">
                  <CheckCircleRoundedIcon color="secondary" fontSize="small" />
                  <Typography variant="body2" color="text.secondary" fontWeight={700}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              border: "1px solid #dbe4ef",
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.78)",
              p: { xs: 2.5, sm: 4 },
              boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                minHeight: { xs: 260, sm: 340 },
                borderRadius: 2,
                bgcolor: "#f8fbff",
                border: "1px solid #e6edf5",
              }}
            >
              <Box
                component="img"
                src={heroImage}
                alt="Layered service management dashboard"
                sx={{
                  width: { xs: 210, sm: 280, md: 330 },
                  filter: "drop-shadow(0 28px 42px rgba(35, 108, 201, 0.18))",
                }}
              />
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{ mt: 3 }}
            >
              {[
                ["24", "active locations"],
                ["118", "registered machines"],
                ["96%", "SLA health"],
              ].map(([value, label]) => (
                <Box key={label} sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h4" color="primary" fontWeight={900}>
                    {value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>

      <Box id="capabilities" sx={{ bgcolor: "#fff", borderTop: "1px solid #dbe4ef" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Built for daily service control
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            {capabilities.map((item) => (
              <Box
                key={item.title}
                sx={{
                  border: "1px solid #dbe4ef",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "#fff",
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 18px 44px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                <Box sx={{ color: "primary.main", mb: 1.5 }}>{item.icon}</Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.65 }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box id="coverage" sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Designed for bank equipment service teams, branch coordinators and operations managers.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
