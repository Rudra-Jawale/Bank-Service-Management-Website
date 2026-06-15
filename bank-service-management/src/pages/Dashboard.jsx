import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function Dashboard() {
  const stats = [
    { title: "Total Banks", value: 25 },
    { title: "Total Branches", value: 150 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((item) => (
          <Grid item xs={12} md={3} key={item.title}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}