import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 220;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>

        <ListItemButton component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/banks">
          <ListItemText primary="Banks" />
        </ListItemButton>

        <ListItemButton component={Link} to="/branches">
          <ListItemText primary="Branches" />
        </ListItemButton>

        <ListItemButton component={Link} to="/machines">
          <ListItemText primary="Machines" />
        </ListItemButton>

      </List>
    </Drawer>
  );
}