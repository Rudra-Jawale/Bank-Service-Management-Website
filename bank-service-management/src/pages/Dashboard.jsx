import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";

const metrics = [
  { label: "Banks", value: "18", change: "+3 this month", icon: <AccountBalanceRoundedIcon /> },
  { label: "Branches", value: "64", change: "9 need review", icon: <AddTaskRoundedIcon /> },
  { label: "Machines", value: "218", change: "96% active", icon: <PrecisionManufacturingRoundedIcon /> },
  { label: "Open Tickets", value: "12", change: "4 urgent", icon: <SecurityRoundedIcon /> },
];

const services = [
  { title: "Cash Counting Machines", icon: <CurrencyExchangeRoundedIcon />, health: 88 },
  { title: "Note Counting Machines", icon: <PrecisionManufacturingRoundedIcon />, health: 92 },
  { title: "CCTV Systems", icon: <CameraAltRoundedIcon />, health: 76 },
  { title: "Alarm Systems", icon: <SecurityRoundedIcon />, health: 84 },
  { title: "Passbook Printers", icon: <LocalPrintshopRoundedIcon />, health: 81 },
  { title: "Biometric Devices", icon: <FingerprintRoundedIcon />, health: 94 },
];

const activity = [
  ["SBI Nagpur Main", "Note counter calibration", "Today"],
  ["HDFC Dharampeth", "CCTV DVR inspection", "Tomorrow"],
  ["Axis Civil Lines", "Passbook printer service", "Fri"],
];

function Dashboard() {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.4fr) minmax(300px, 0.6fr)" },
          gap: 2.5,
          alignItems: "stretch",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            border: "1px solid #dbe4ef",
            borderRadius: 2,
            bgcolor: "#fff",
            overflow: "hidden",
          }}
        >
          <Stack spacing={2.5}>
            <Chip
              label="Operations Overview"
              color="primary"
              variant="outlined"
              sx={{ alignSelf: "flex-start", fontWeight: 800 }}
            />
            <Box>
              <Typography
                component="h1"
                variant="h3"
                sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, lineHeight: 1.1 }}
              >
                National Computers and Communication Systems
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 760, lineHeight: 1.7 }}>
                A light control center for branch coverage, machine health, field service and ticket follow-up.
              </Typography>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />}>
                Review Tickets
              </Button>
              <Button variant="outlined">Export Summary</Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid #dbe4ef",
            borderRadius: 2,
            bgcolor: "#f8fbff",
          }}
        >
          <Typography variant="h6">Today&apos;s focus</Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {activity.map(([branch, task, date]) => (
              <Box
                key={branch}
                sx={{
                  p: 2,
                  border: "1px solid #dbe4ef",
                  borderRadius: 2,
                  bgcolor: "#fff",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                  <Typography fontWeight={800} noWrap>
                    {branch}
                  </Typography>
                  <Chip label={date} size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                  {task}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        {metrics.map((metric) => (
          <Paper
            key={metric.label}
            elevation={0}
            sx={{
              p: 2.5,
              border: "1px solid #dbe4ef",
              borderRadius: 2,
              minWidth: 0,
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={700}>
                  {metric.label}
                </Typography>
                <Typography variant="h4" sx={{ mt: 0.75 }}>
                  {metric.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  color: "primary.main",
                  bgcolor: "rgba(35, 108, 201, 0.1)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                {metric.icon}
              </Box>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              {metric.change}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h5">Service categories</Typography>
            <Typography variant="body2" color="text.secondary">
              Equipment health and maintenance coverage.
            </Typography>
          </Box>
          <Button variant="outlined">Manage Services</Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {services.map((service) => (
            <Paper
              key={service.title}
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid #dbe4ef",
                borderRadius: 2,
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
                },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    color: "secondary.main",
                    bgcolor: "rgba(15, 159, 143, 0.1)",
                    flexShrink: 0,
                  }}
                >
                  {service.icon}
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography fontWeight={800} noWrap>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.health}% healthy
                  </Typography>
                </Box>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={service.health}
                sx={{
                  mt: 2,
                  height: 8,
                  borderRadius: 8,
                  bgcolor: "#edf2f7",
                }}
              />
            </Paper>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

export default Dashboard;
