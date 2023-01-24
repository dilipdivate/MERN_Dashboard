import React, { useEffect } from "react";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";

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
  TextField,
  Box,
  Grid,
  Link,
  Checkbox,
  Stack,
  CssBaseline,
  Avatar,
  createTheme,
} from "@mui/material";
import { usePostForgotPasswordMutation } from "globalStore/dashboardApi";

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState([]);
  const navigate = useNavigate();

  const [postForgotPassword, { isLoading, isError, error, isSuccess }] =
    usePostForgotPasswordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(data);
    setSent(true);
    setSubmitting(true);

    const resp = {
      email: data.get("email"),
    };
    // console.log(email);

    // // Cast the event target to an html form
    // const form = event.target;
    // // const form = event.target as HTMLFormElement;
    // console.log(form.email.value);
    // // Get data from the form.
    // const data = {
    //   // email: form.email.value as string,
    //   email: form.email.value,
    // };

    postForgotPassword(resp)
      .unwrap()
      .then((response) => {
        console.log("RESP1:", response);
        setSent(false);
        setToken(response.token);
        setSubmitting(false);
        navigate({
          pathname: "/resetPassword",
          search: `?token=${response.token}`,
        });
      })

      .catch((error) => {
        // console.log("Dilip");
        setSent(false);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    // if (isSuccess) {
    // }
    if (isError) {
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach(
          (el) => {
            setErrorMsg(el.message);
            setSent(false);
            setSubmitting(false);
          }
          // console.log("DILIPEL::", el.message)
        );
      } else {
        // toast.error((error as any).data.message, {
        //   position: 'top-right',
        // });
        setSent(false);
        setSubmitting(false);
        setErrorMsg(error.data.message);
        console.log(error.data.message);
      }
    }
  }, [isLoading]);

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

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
          {/* <InputLabel htmlFor="email">Email address</InputLabel> */}
          {/* <TextField
            disabled={submitting || sent}
            margin="normal"
            required
            fullWidth
            label="Email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          /> */}

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
          {/* <Button
            variant="contained"
            type="submit"
            sx={{ mt: 1, mb: 2, mx: 2 }}
            disabled={submitting || sent}
            color="secondary"
            fullWidth
          >
            {submitting || sent ? "In progress…" : "Send reset link"}
          </Button> */}

          <FormControl>
            <Button
              variant="contained"
              type="submit"
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
