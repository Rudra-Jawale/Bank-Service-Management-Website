import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
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
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const banks = [
  { name: "State Bank of India", code: "SBI001", branches: 25, machines: 82, status: "Active" },
  { name: "HDFC Bank", code: "HDFC001", branches: 18, machines: 54, status: "Active" },
  { name: "Axis Bank", code: "AXIS008", branches: 11, machines: 31, status: "Review" },
  { name: "Bank of Maharashtra", code: "BOM014", branches: 10, machines: 27, status: "Active" },
];

export default function Banks() {
  const [query, setQuery] = useState("");

  const filteredBanks = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return banks;
    return banks.filter((bank) =>
      [bank.name, bank.code, bank.status].some((value) =>
        String(value).toLowerCase().includes(search)
      )
    );
  }, [query]);

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
            Banks
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Manage bank partners, branch coverage and machine allocation.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />}>
          Add Bank
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        {[
          ["Total banks", banks.length],
          ["Active branches", 64],
          ["Machines mapped", 194],
        ].map(([label, value]) => (
          <Paper
            key={label}
            elevation={0}
            sx={{ p: 2.5, border: "1px solid #dbe4ef", borderRadius: 2 }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={700}>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.75 }}>
              {value}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #dbe4ef", borderRadius: 2, overflow: "hidden" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems={{ md: "center" }}
          justifyContent="space-between"
          sx={{ p: 2 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <AccountBalanceRoundedIcon color="primary" />
            <Typography variant="h6">Bank directory</Typography>
          </Stack>
          <TextField
            size="small"
            placeholder="Search banks"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ width: { xs: "100%", md: 320 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 720 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fbff" }}>
                <TableCell>Bank Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell align="right">Branches</TableCell>
                <TableCell align="right">Machines</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBanks.map((bank) => (
                <TableRow key={bank.code} hover>
                  <TableCell>
                    <Typography fontWeight={800}>{bank.name}</Typography>
                  </TableCell>
                  <TableCell>{bank.code}</TableCell>
                  <TableCell align="right">{bank.branches}</TableCell>
                  <TableCell align="right">{bank.machines}</TableCell>
                  <TableCell>
                    <Chip
                      label={bank.status}
                      size="small"
                      color={bank.status === "Active" ? "success" : "warning"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
