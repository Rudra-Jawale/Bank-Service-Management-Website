import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

export default function Machines() {

  const machines = [
    {
      id: "MC001",
      type: "Note Counting",
      branch: "SBI Nagpur",
      status: "Working",
    },
    {
      id: "MC002",
      type: "CCTV DVR",
      branch: "HDFC Nagpur",
      status: "Repair",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Machines
      </Typography>

      <Paper>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {machines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell>{machine.id}</TableCell>
                <TableCell>{machine.type}</TableCell>
                <TableCell>{machine.branch}</TableCell>
                <TableCell>{machine.status}</TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>

      </Paper>
    </div>
  );
}