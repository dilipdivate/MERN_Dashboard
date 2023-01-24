import React, { useEffect } from "react";

import { usePostVerifyEmailMutation } from "globalStore/dashboardApi";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const VerifyEmail = () => {
  const [postVerifyEmail, { isLoading, isError, error, isSuccess }] =
    usePostVerifyEmailMutation();
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSent(true);
    setSubmitting(true);

    const verificationCode = location.search.split("=")[1];

    await postVerifyEmail(verificationCode)
      .unwrap()
      .then((response) => {
        console.log("RESP1:", response);
        setSent(false);
        setSubmitting(false);
        navigate("/signin");
      })
      .catch((error) => {
        setSent(false);
        setSubmitting(false);
      });
  };

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
        <Typography component="h1" variant="h5">
          Click on the link to VerifyEmail
        </Typography>
        {errorMsg}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={submitting || sent}
          >
            {submitting || sent ? "In progress…" : "Verify Registration"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
