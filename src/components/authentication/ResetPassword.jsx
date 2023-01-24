import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Link as ReactLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { usePatchResetPasswordMutation } from "globalStore/dashboardApi";

function ResetPassword() {
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();

  // console.log("Params", params);
  // console.log("location", location.search.split("=")[1]);

  const [patchResetPassword, { isLoading, isError, error, isSuccess }] =
    usePatchResetPasswordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setSent(true);
    setSubmitting(true);

    const resp = {
      password: data.get("password"),
      passwordConfirm: data.get("passwordConfirm"),
      resetToken: location.search.split("=")[1],
    };

    patchResetPassword(resp)
      .unwrap()
      .then((response) => {
        console.log("RESP1:", response);
        setSent(false);
        setSubmitting(false);
      })
      .then((error) => {
        console.log(error);
      })
      .catch((error) => {
        // console.log("Dilip");
        setSent(false);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      // toast.success('You successfully logged in');
      navigate("/signin");
    }
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {errorMsg}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            variant="standard"
            required
            fullWidth
            name="password"
            label="Password"
            // type="password"
            id="password"
            autoComplete="current-password"
            type="password"
            autoFocus
          />
          <TextField
            margin="normal"
            variant="standard"
            required
            fullWidth
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            id="passwordConfirm"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={submitting || sent}
          >
            {submitting || sent ? "In progress…" : "Submit"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPassword;
