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
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const branches = [
  { bank: "SBI", name: "Nagpur Main", city: "Nagpur", machines: 14, engineer: "Amit S.", status: "Covered" },
  { bank: "HDFC", name: "Dharampeth", city: "Nagpur", machines: 9, engineer: "Neha P.", status: "Covered" },
  { bank: "Axis", name: "Civil Lines", city: "Nagpur", machines: 6, engineer: "Rohit K.", status: "Visit Due" },
  { bank: "BOM", name: "Sitabuldi", city: "Nagpur", machines: 7, engineer: "Kiran M.", status: "Covered" },
];

export default function Branches() {
  const [query, setQuery] = useState("");

  const filteredBranches = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return branches;
    return branches.filter((branch) =>
      [branch.bank, branch.name, branch.city, branch.engineer, branch.status].some((value) =>
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
            Branches
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Track location ownership, city coverage and assigned service engineers.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />}>
          Add Branch
        </Button>
      </Stack>

      <Paper elevation={0} sx={{ border: "1px solid #dbe4ef", borderRadius: 2, overflow: "hidden" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems={{ md: "center" }}
          justifyContent="space-between"
          sx={{ p: 2 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <AddLocationAltRoundedIcon color="primary" />
            <Typography variant="h6">Branch coverage</Typography>
          </Stack>
          <TextField
            size="small"
            placeholder="Search branches"
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
          <Table sx={{ minWidth: 760 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fbff" }}>
                <TableCell>Bank</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>City</TableCell>
                <TableCell align="right">Machines</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBranches.map((branch) => (
                <TableRow key={`${branch.bank}-${branch.name}`} hover>
                  <TableCell>
                    <Typography fontWeight={800}>{branch.bank}</Typography>
                  </TableCell>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.city}</TableCell>
                  <TableCell align="right">{branch.machines}</TableCell>
                  <TableCell>{branch.engineer}</TableCell>
                  <TableCell>
                    <Chip
                      label={branch.status}
                      size="small"
                      color={branch.status === "Covered" ? "success" : "warning"}
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
