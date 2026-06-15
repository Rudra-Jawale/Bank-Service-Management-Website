import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";

import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SecurityIcon from "@mui/icons-material/Security";
import PrintIcon from "@mui/icons-material/Print";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const services = [
  {
    title: "Cash Counting Machines",
    icon: <CurrencyExchangeIcon fontSize="large" />,
  },
  {
    title: "Note Counting Machines",
    icon: <PrecisionManufacturingIcon fontSize="large" />,
  },
  {
    title: "CCTV Systems",
    icon: <CameraAltIcon fontSize="large" />,
  },
  {
    title: "Alarm Systems",
    icon: <SecurityIcon fontSize="large" />,
  },
  {
    title: "Passbook Printers",
    icon: <PrintIcon fontSize="large" />,
  },
  {
    title: "Biometric Devices",
    icon: <FingerprintIcon fontSize="large" />,
  },
];

function Dashboard() {
  return (
    <Box>

      {/* Hero Section */}

      <Box
        sx={{
          minHeight: "500px",
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
          color: "white",
          p: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5,
        }}
      >
        <Box maxWidth="600px">
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2 }}
          >
            BANK SERVICE MANAGEMENT
          </Typography>

          <Typography
            variant="h2"
            fontWeight="bold"
            mt={2}
          >
            Managing Banking
            Equipment Services
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 3,
              opacity: 0.8,
              lineHeight: 1.8,
            }}
          >
            Track banks, branches, machines,
            service visits and spare parts from
            one centralized platform.
          </Typography>

          <Box mt={4}>
            <Button
              variant="contained"
              size="large"
            >
              View Machines
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                ml: 2,
                color: "white",
                borderColor: "white",
              }}
            >
              Service Tracking
            </Button>
          </Box>
        </Box>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="hero"
          width="280"
        />
      </Box>

      {/* Services */}

      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={4}
      >
        Our Services
      </Typography>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} md={4} key={service.title}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              {service.icon}

              <Typography
                variant="h6"
                mt={2}
                fontWeight="bold"
              >
                {service.title}
              </Typography>

              <Typography
                variant="body2"
                mt={2}
                color="text.secondary"
              >
                Professional installation,
                maintenance and support
                services.
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;