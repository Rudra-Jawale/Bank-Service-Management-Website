import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const machines = [
  { id: "MC001", type: "Note Counting", branch: "SBI Nagpur Main", status: "Working", lastService: "2026-06-18", priority: "Normal" },
  { id: "MC002", type: "CCTV DVR", branch: "HDFC Dharampeth", status: "Repair", lastService: "2026-06-10", priority: "High" },
  { id: "MC003", type: "Passbook Printer", branch: "Axis Civil Lines", status: "Visit Due", lastService: "2026-05-29", priority: "Medium" },
  { id: "MC004", type: "Biometric Device", branch: "BOM Sitabuldi", status: "Working", lastService: "2026-06-23", priority: "Normal" },
];

const statusColor = {
  Working: "success",
  Repair: "error",
  "Visit Due": "warning",
};

export default function Machines() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filteredMachines = useMemo(() => {
    const search = query.trim().toLowerCase();
    return machines.filter((machine) => {
      const statusMatch = status === "All" || machine.status === status;
      const searchMatch =
        !search ||
        [machine.id, machine.type, machine.branch, machine.status, machine.priority].some((value) =>
          String(value).toLowerCase().includes(search)
        );
      return statusMatch && searchMatch;
    });
  }, [query, status]);

  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h1" variant="h4">
            Machines
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Monitor service status, priorities and recent maintenance activity.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />}>
          Add Machine
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        {["Working", "Repair", "Visit Due"].map((item) => (
          <Paper
            key={item}
            elevation={0}
            sx={{ p: 2.5, border: "1px solid #dbe4ef", borderRadius: 2 }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={700}>
              {item}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.75 }}>
              {machines.filter((machine) => machine.status === item).length}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #dbe4ef", borderRadius: 2, overflow: "hidden" }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={1.5}
          alignItems={{ lg: "center" }}
          justifyContent="space-between"
          sx={{ p: 2 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <PrecisionManufacturingRoundedIcon color="primary" />
            <Typography variant="h6">Machine inventory</Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: { xs: "100%", lg: "auto" } }}>
            <TextField
              size="small"
              select
              label="Status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              sx={{ minWidth: { xs: "100%", sm: 160 } }}
            >
              {["All", "Working", "Repair", "Visit Due"].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              placeholder="Search machines"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              sx={{ width: { xs: "100%", sm: 300 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 820 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fbff" }}>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Service</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMachines.map((machine) => (
                <TableRow key={machine.id} hover>
                  <TableCell>
                    <Typography fontWeight={800}>{machine.id}</Typography>
                  </TableCell>
                  <TableCell>{machine.type}</TableCell>
                  <TableCell>{machine.branch}</TableCell>
                  <TableCell>
                    <Chip
                      label={machine.status}
                      size="small"
                      color={statusColor[machine.status]}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{machine.lastService}</TableCell>
                  <TableCell>{machine.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
