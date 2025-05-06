import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f5f5f5' }}>
      <div
        className="card p-4 text-center"
        style={{
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          borderRadius: '12px',
        }}
      >
        <h4 className="mb-4 text-dark">Welcome to <strong>VideoTV Library</strong></h4>

        <Button
          variant="contained"
          color="warning"
          component={Link}
          to="/userlogin"
          fullWidth
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          User Login
        </Button>

        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/login"
          fullWidth
          sx={{ fontWeight: 'bold' }}
        >
          Admin Login
        </Button>
      </div>
    </div>
  );
}
