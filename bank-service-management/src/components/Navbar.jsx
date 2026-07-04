import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Navbar({ onMenuClick }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "rgba(255, 255, 255, 0.88)",
        color: "text.primary",
        borderBottom: "1px solid #dbe4ef",
        backdropFilter: "blur(18px)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, sm: 72 },
          px: { xs: 2, sm: 3 },
          gap: 2,
        }}
      >
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: "none" } }}
          aria-label="Open navigation"
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.15,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Service Control
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Monitor banks, branches, machines and open service work.
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search records"
          sx={{
            width: { md: 260, lg: 340 },
            display: { xs: "none", md: "block" },
            "& .MuiOutlinedInput-root": {
              bgcolor: "#f7fafc",
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

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
        >
          New Ticket
        </Button>

        <Tooltip title="Notifications">
          <IconButton
            sx={{
              border: "1px solid #dbe4ef",
              bgcolor: "#fff",
              flexShrink: 0,
            }}
            aria-label="Notifications"
          >
            <NotificationsNoneRoundedIcon />
          </IconButton>
        </Tooltip>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ minWidth: 0 }}
        >
          <Avatar sx={{ width: 38, height: 38, bgcolor: "primary.main" }}>
            NC
          </Avatar>
          <Box sx={{ display: { xs: "none", lg: "block" }, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={800} noWrap>
              National Computers
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Admin workspace
            </Typography>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
