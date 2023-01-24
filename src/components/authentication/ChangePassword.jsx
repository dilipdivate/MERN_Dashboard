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
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { usePatchChangePasswordMutation } from "globalStore/dashboardApi";

function ChangePassword() {
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [patchChangePassword, { isLoading, isError, error, isSuccess }] =
    usePatchChangePasswordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setSent(true);
    setSubmitting(true);

    const resp = {
      email: data.get("email"),
      oldPassword: data.get("oldPassword"),
      newPassword: data.get("newPassword"),
    };

    patchChangePassword(resp)
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
          Change Password
        </Typography>
        {errorMsg}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            id="oldPassword"
            label="Old Password"
            name="oldPassword"
            autoComplete="oldPassword"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            name="newPassword"
            label="New Password"
            id="newPassword"
            autoComplete="NewPassword"
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

export default ChangePassword;
