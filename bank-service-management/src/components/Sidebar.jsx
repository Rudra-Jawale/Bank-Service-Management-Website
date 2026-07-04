import {
  Box,
  Chip,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardRoundedIcon />,
  },
  {
    label: "Banks",
    path: "/banks",
    icon: <AccountBalanceRoundedIcon />,
  },
  {
    label: "Branches",
    path: "/branches",
    icon: <LanRoundedIcon />,
  },
  {
    label: "Machines",
    path: "/machines",
    icon: <PrecisionManufacturingRoundedIcon />,
  },
];

export default function Sidebar({ drawerWidth = 264, mobileOpen, onClose }) {
  const location = useLocation();

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              bgcolor: "primary.main",
              boxShadow: "0 12px 24px rgba(35, 108, 201, 0.24)",
              flexShrink: 0,
            }}
          >
            <HomeRepairServiceRoundedIcon />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ lineHeight: 1.1 }} noWrap>
              N.C.C.S
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Bank service suite
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <List sx={{ px: 1.5, py: 2 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              onClick={onClose}
              selected={active}
              sx={{
                mb: 0.75,
                borderRadius: 2,
                minHeight: 48,
                color: active ? "primary.main" : "text.secondary",
                "&.Mui-selected": {
                  bgcolor: "rgba(35, 108, 201, 0.1)",
                },
                "&.Mui-selected:hover, &:hover": {
                  bgcolor: active ? "rgba(35, 108, 201, 0.14)" : "#f4f7fb",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? 800 : 700,
                  noWrap: true,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            border: "1px solid #dbe4ef",
            borderRadius: 2,
            p: 2,
            bgcolor: "#f7fafc",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2" fontWeight={800}>
              SLA Health
            </Typography>
            <Chip label="96%" size="small" color="success" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            12 services closed this week.
          </Typography>
        </Box>

        <ListItemButton
          component={Link}
          to="/signin"
          onClick={onClose}
          sx={{
            mt: 1.5,
            borderRadius: 2,
            color: "text.secondary",
          }}
        >
          <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sign out"
            primaryTypographyProps={{ fontWeight: 700, noWrap: true }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: "1px solid #dbe4ef",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #dbe4ef",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
