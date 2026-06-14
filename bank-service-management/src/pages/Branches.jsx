import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

export default function Branches() {

  const branches = [
    {
      bank: "SBI",
      name: "Nagpur Main",
      city: "Nagpur",
    },
    {
      bank: "HDFC",
      name: "Dharampeth",
      city: "Nagpur",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Branches
      </Typography>

      <Paper>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Bank</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {branches.map((branch, index) => (
              <TableRow key={index}>
                <TableCell>{branch.bank}</TableCell>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.city}</TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>

      </Paper>
    </div>
  );
}