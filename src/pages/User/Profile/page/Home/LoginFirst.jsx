import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginFirst({ open, onClose }) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Login Required</DialogTitle>
      <DialogContent>
        <Typography>You need to log in to view comments.</Typography>
      </DialogContent>
      <DialogActions sx={{ alignItems: "center",justifyContent:"center",mb:2 }}>
        <Button size="small" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => navigate("/login")}
          variant="contained"
          color="primary"
          size="small"
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
