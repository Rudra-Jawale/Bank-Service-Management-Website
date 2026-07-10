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

import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { api } from "../api/client";

const emptyForm = {
  bank_name: "",
  bank_code: "",
  head_office: "",
};

export default function Banks() {
  const [banks, setBanks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const show = (text, severity = "success") =>
    setMessage({
      open: true,
      text,
      severity,
    });

  const load = async () => {
    try {
      setLoading(true);
      setBanks(await api("/banks/"));
    } catch (e) {
      show(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return !q
      ? banks
      : banks.filter((b) =>
          [b.bank_name, b.bank_code, b.head_office].some((v) =>
            String(v ?? "").toLowerCase().includes(q)
          )
        );
  }, [banks, query]);

  const add = async () => {
    if (Object.values(form).some((v) => !v.trim()))
      return show("Please fill all bank fields.", "warning");

    try {
      setSaving(true);

      const b = await api("/banks/", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          bank_code: form.bank_code.trim().toUpperCase(),
        }),
      });

      setBanks((x) => [...x, b]);
      setOpen(false);
      setForm(emptyForm);
      show("Bank added successfully.");
    } catch (e) {
      show(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (b) => {
    if (
      !window.confirm(
        `Delete ${b.bank_name}? Its branches and machines will also be deleted.`
      )
    )
      return;

    try {
      setDeleting(b.id);

      await api(`/banks/${b.id}`, {
        method: "DELETE",
      });

      setBanks((x) => x.filter((v) => v.id !== b.id));
      show("Bank deleted successfully.");
    } catch (e) {
      show(e.message, "error");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography component="h1" variant="h4">
            Banks
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Manage bank partners and head office records.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setOpen(true)}
        >
          Add Bank
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3,1fr)",
          },
          gap: 2,
        }}
      >
        {[
          ["Total banks", banks.length],
          ["Head offices", new Set(banks.map((b) => b.head_office)).size],
          ["Visible results", filtered.length],
        ].map(([l, v]) => (
          <Paper
            key={l}
            elevation={0}
            sx={{
              p: 2.5,
              border: "1px solid #dbe4ef",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={700}
            >
              {l}
            </Typography>

            <Typography variant="h4" sx={{ mt: 0.75 }}>
              {v}
            </Typography>
          </Paper>
        ))}
      </Box>

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
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              width: {
                xs: "100%",
                md: 320,
              },
            }}
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
          <Table sx={{ minWidth: 720 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fbff" }}>
                <TableCell>Bank Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Head Office</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    No banks found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((b) => (
                  <TableRow key={b.id} hover>
                    <TableCell>
                      <Typography fontWeight={800}>
                        {b.bank_name}
                      </Typography>
                    </TableCell>

                    <TableCell>{b.bank_code}</TableCell>

                    <TableCell>{b.head_office}</TableCell>

                    <TableCell align="right">
                      <Tooltip title="Delete bank">
                        <span>
                          <IconButton
                            color="error"
                            disabled={deleting === b.id}
                            onClick={() => remove(b)}
                          >
                            <DeleteRoundedIcon />
                          </IconButton>
                        </span>
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
        <DialogTitle>Add New Bank</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {[
              ["Bank Name", "bank_name"],
              ["Bank Code", "bank_code"],
              ["Head Office", "head_office"],
            ].map(([l, n]) => (
              <TextField
                key={n}
                required
                fullWidth
                label={l}
                name={n}
                value={form[n]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [n]: e.target.value,
                  })
                }
              />
            ))}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={add}
            disabled={saving}
          >
            {saving ? "Adding..." : "Add Bank"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={message.open}
        autoHideDuration={4000}
        onClose={() =>
          setMessage({
            ...message,
            open: false,
          })
        }
      >
        <Alert
          severity={message.severity}
          onClose={() =>
            setMessage({
              ...message,
              open: false,
            })
          }
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}