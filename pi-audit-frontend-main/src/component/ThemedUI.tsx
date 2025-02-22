// src/component/ThemedUI.js
import { AppBar, Toolbar, Typography, Card, CardContent, TextField, Button } from "@mui/material";

const ThemedUI = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Themed App</Typography>
        </Toolbar>
      </AppBar>

      <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Custom Themed Components
            </Typography>

            <TextField
              fullWidth
              label="Enter Text"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />

            <Button variant="contained" color="success">
              Primary Button
            </Button>
            <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }}>
              Secondary Button
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ThemedUI;
