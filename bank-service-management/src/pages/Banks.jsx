import {
  Typography,
  Paper,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

export default function Banks() {

  const banks = [
    {
      name: "State Bank of India",
      code: "SBI001",
      branches: 25,
    },
    {
      name: "HDFC Bank",
      code: "HDFC001",
      branches: 18,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Banks
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add Bank
      </Button>

      <Paper>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Bank Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Branches</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {banks.map((bank) => (
              <TableRow key={bank.code}>
                <TableCell>{bank.name}</TableCell>
                <TableCell>{bank.code}</TableCell>
                <TableCell>{bank.branches}</TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>

      </Paper>
    </div>
  );
}