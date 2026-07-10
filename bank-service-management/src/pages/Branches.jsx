import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { api } from "../api/client";

const empty = {
  bank_id: "",
  branch_name: "",
  city: "",
  engineer: "",
  status: "Covered",
};

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [banks, setBanks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(empty);

  const [msg, setMsg] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const show = (text, severity = "success") =>
    setMsg({
      open: true,
      text,
      severity,
    });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [br, ba] = await Promise.all([
          api("/branches/"),
          api("/banks/"),
        ]);

        setBranches(br);
        setBanks(ba);
      } catch (e) {
        show(e.message, "error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return !q
      ? branches
      : branches.filter((b) =>
          [b.bank_code, b.branch_name, b.city, b.engineer, b.status].some((v) =>
            String(v ?? "").toLowerCase().includes(q)
          )
        );
  }, [branches, query]);

  const add = async () => {
    if (!form.bank_id || !form.branch_name.trim() || !form.city.trim()) {
      return show(
        "Select a bank and fill branch name and city.",
        "warning"
      );
    }

    try {
      setSaving(true);

      const b = await api("/branches/", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          bank_id: Number(form.bank_id),
          engineer: form.engineer.trim() || "Unassigned",
        }),
      });

      setBranches((x) => [...x, b]);
      setForm(empty);
      setOpen(false);

      show("Branch added successfully.");
    } catch (e) {
      show(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (b) => {
    if (
      !window.confirm(
        `Delete branch ${b.branch_name}? Its machines will also be deleted.`
      )
    )
      return;

    try {
      await api(`/branches/${b.id}`, {
        method: "DELETE",
      });

      setBranches((x) => x.filter((v) => v.id !== b.id));

      show("Branch deleted successfully.");
    } catch (e) {
      show(e.message, "error");
    }
  };

  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Box>
          <Typography variant="h4">
            Branches
          </Typography>

          <Typography color="text.secondary">
            Add and remove bank branches and track machine allocation.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setOpen(true)}
          disabled={!banks.length}
        >
          Add Branch
        </Button>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #dbe4ef",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          sx={{ p: 2 }}
          spacing={1.5}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <AddLocationAltRoundedIcon color="primary" />
            <Typography variant="h6">
              Branch coverage
            </Typography>
          </Stack>

          <TextField
            size="small"
            placeholder="Search branches"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fbff" }}>
                <TableCell>Bank</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Machines</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((b) => (
                  <TableRow
                    key={b.id}
                    hover
                  >
                    <TableCell>
                      <Typography fontWeight={800}>
                        {b.bank_code}
                      </Typography>
                    </TableCell>

                    <TableCell>{b.branch_name}</TableCell>

                    <TableCell>{b.city}</TableCell>

                    <TableCell>{b.machine_count}</TableCell>

                    <TableCell>{b.engineer}</TableCell>

                    <TableCell>{b.status}</TableCell>

                    <TableCell align="right">
                      <Tooltip title="Delete branch">
                        <IconButton
                          color="error"
                          onClick={() => remove(b)}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={open}
        onClose={() => !saving && setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Add Branch
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              select
              required
              label="Bank"
              value={form.bank_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  bank_id: e.target.value,
                })
              }
            >
              {banks.map((b) => (
                <MenuItem
                  key={b.id}
                  value={b.id}
                >
                  {b.bank_code} — {b.bank_name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              label="Branch Name"
              value={form.branch_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  branch_name: e.target.value,
                })
              }
            />

            <TextField
              required
              label="City"
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
            />

            <TextField
              label="Engineer"
              value={form.engineer}
              onChange={(e) =>
                setForm({
                  ...form,
                  engineer: e.target.value,
                })
              }
            />

            <TextField
              select
              label="Status"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            >
              {["Covered", "Visit Due"].map((x) => (
                <MenuItem
                  key={x}
                  value={x}
                >
                  {x}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={add}
            disabled={saving}
          >
            {saving ? "Adding..." : "Add Branch"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={msg.open}
        autoHideDuration={4000}
        onClose={() =>
          setMsg({
            ...msg,
            open: false,
          })
        }
      >
        <Alert severity={msg.severity}>
          {msg.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}