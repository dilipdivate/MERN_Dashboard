import * as React from "react";
import { FormEvent } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Container,
  ThemeProvider,
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  Stack,
  CssBaseline,
  Avatar,
  createTheme,
} from "@mui/material";
import { usePostForgotPasswordMutation } from "globalStore/api";

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const [postForgotPassword, response] = usePostForgotPasswordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSent(true);
    setSubmitting(true);

    // Cast the event target to an html form
    const form = event.target;
    // const form = event.target as HTMLFormElement;

    // Get data from the form.
    const data = {
      // email: form.email.value as string,
      email: form.email.value,
    };

    postForgotPassword(data)
      .unwrap()
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mb: 3, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h3" gutterBottom align="center">
          Forgot your password?
        </Typography>
        <Typography variant="body2" align="center">
          {"Enter your email address below and we'll " +
            "send you a link to reset your password."}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 6 }}>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              disabled={submitting || sent}
              required
              aria-describedby="email-helper-text"
            />
          </FormControl>

          <FormControl>
            <Button
              variant="contained"
              sx={{ mt: 1, mb: 2, mx: 2 }}
              disabled={submitting || sent}
              color="secondary"
              fullWidth
            >
              {submitting || sent ? "In progress…" : "Send reset link"}
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
