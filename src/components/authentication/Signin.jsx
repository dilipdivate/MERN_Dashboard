import * as React from "react";
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
import { Link as ReactLink } from "react-router-dom";
import { useGetUserByEmailQuery } from "globalStore/api";
import { useSelector } from "react-redux";

export default function Signin() {
  const email = useSelector((state) => state.global.email);

  const { data } = useGetUserByEmailQuery(email);
  console.log("Dfffff", data);

  const handleSubmit = (event) => {
    event.preventDefault();
    const resp = new FormData(event.currentTarget);
    console.log({
      email: resp.get("email"),
      password: resp.get("password"),
    });
    const email = resp.get("email");
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              <ReactLink underline="none" to="/Signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </ReactLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
