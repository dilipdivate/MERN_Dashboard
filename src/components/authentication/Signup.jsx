import * as React from "react";
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
import { Link as ReactLink } from "react-router-dom";
import { usePostUserMutation } from "globalStore/api";

export default function SignUp() {
  const [postUser, response] = usePostUserMutation();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
    const confirmpassword = data.get("confirmpassword");
    console.log(password);
    console.log(confirmpassword);
    // if (password !== confirmpassword) {
    //   alert("passwords don't match");
    //   return;
    // }
    const resp = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      occupation: data.get("occupation"),
      phoneNumber: data.get("phoneNumber"),
    };

    postUser(resp)
      .unwrap()
      .then((error) => {
        console.log(error);
      });
  };

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
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                helperText="Incorrect entry."
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastname"
                label="Last Name"
                type="text"
                id="lastname"
                autoFocus
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
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
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
              />
              {/* <FormControl sx={{ mt: 2, width: "30ch" }} variant="outlined">
                <InputLabel htmlFor="confirmpassword">
                  Confirm Password
                </InputLabel>

                <OutlinedInput
                  id="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirmpassword visibility"
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
                required
                fullWidth
                name="city"
                label="City"
                type="text"
                id="city"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="state"
                label="State"
                type="text"
                id="state"
                autoFocus
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="country"
                label="Country"
                type="text"
                id="country"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone"
                type="text"
                id="phoneNumber"
                autoFocus
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            name="occupation"
            label="Occupation"
            type="text"
            id="occupation"
            autoFocus
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
          >
            Sign Up
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
