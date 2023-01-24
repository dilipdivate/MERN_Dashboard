import React, { useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { usePostUserMutation } from "globalStore/dashboardApi";
import VerifyEmail from "./VerifyEmail.jsx";

export default function SignUp() {
  const [postUser, { isLoading, isError, error, isSuccess }] =
    usePostUserMutation();
  const [errorMsg, setErrorMsg] = React.useState([]);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event
    // event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password = data.get("password");
    const passwordConfirm = data.get("passwordConfirm");
    console.log(password);
    console.log(passwordConfirm);
    // if (password !== passwordConfirm) {
    //   alert("passwords don't match");
    //   return;
    // }
    const resp = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      passwordConfirm: data.get("passwordConfirm"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      occupation: data.get("occupation"),
      phoneNumber: data.get("phoneNumber"),
    };

    setSent(true);
    setSubmitting(true);

    postUser(resp)
      .unwrap()
      .then((response) => {
        console.log("RESP1:", response);
        setSent(false);
        setSubmitting(false);
        navigate({
          pathname: "/verifyEmail",
          search: `?token=${response.verificationToken}`,
        });
      })
      .then((error) => {
        console.log(error);
      })
      .catch((error) => {
        setSent(false);
        setSubmitting(false);
      });
    // console.log("DDRESP:", response);
  };

  useEffect(() => {
    // if (isSuccess) {
    //   // toast.success('You successfully logged in');
    //   navigate("/verifyEmail");
    // }
    if (isError) {
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) =>
          // toast.error(el.message, {
          //   position: 'top-right',
          // })

          {
            console.log(el);
            setErrorMsg(...errorMsg, el.message);
            setSent(false);
            setErrorMsg(el.message);
          }
        );
      } else {
        // toast.error((error as any).data.message, {
        //   position: 'top-right',
        // });
        setErrorMsg(error.data.message);
        console.log("DILIPEL2::", error);
        console.log(error.data.message);
      }
    }
  }, [isLoading]);

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMsg}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                id="firstName"
                helperText="Incorrect entry."
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                type="text"
                id="lastName"
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            variant="standard"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                // type="password"
                id="password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              /> */}
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
                type={showPassword ? "text" : "password"}
              />

              {/* <FormControl sx={{ mt: 2, width: "30ch" }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl> */}
            </Grid>
            <Grid item xs={12} sm={6}>
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
              {/* <FormControl sx={{ mt: 2, width: "30ch" }} variant="outlined">
                <InputLabel htmlFor="passwordConfirm">
                  Confirm Password
                </InputLabel>

                <OutlinedInput
                  id="passwordConfirm"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle passwordConfirm visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl> */}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="city"
                label="City"
                type="text"
                id="city"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="state"
                label="State"
                type="text"
                id="state"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="country"
                label="Country"
                type="text"
                id="country"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="standard"
                required
                fullWidth
                name="phoneNumber"
                label="Phone"
                type="text"
                id="phoneNumber"
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            variant="standard"
            required
            fullWidth
            name="occupation"
            label="Occupation"
            type="text"
            id="occupation"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            disabled={submitting || sent}
          >
            {submitting || sent ? "In progress…" : "Sign Up"}
          </Button>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item>
              <ReactLink underline="none" to="/Signin" variant="body2">
                {"Account already exist? Sign In"}
              </ReactLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
