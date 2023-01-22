import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { usePostProductMutation } from "globalStore/api";

const AddProduct = () => {
  const [postProduct, response] = usePostProductMutation();
  const navigate = useNavigate();
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const resp = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
      category: data.get("category"),
      rating: data.get("rating"),
      supply: data.get("supply"),
    };

    setSent(true);
    setSubmitting(true);

    console.log("Dilip Response", response);
    postProduct(resp)
      .unwrap()
      .then((error) => {
        console.log(error);
      });
    navigate("/Products");
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
          Add Product
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
                name="price"
                label="Price"
                type="number"
                id="price"
                autoFocus
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="category"
            label="category"
            type="text"
            id="category"
            autoComplete="category"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="rating"
                label="Rating"
                type="number"
                id="rating"
                autoComplete="rating"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="supply"
                label="supply"
                type="text"
                id="supply"
                autoFocus
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            disabled={submitting || sent}
          >
            {submitting || sent ? "In progress…" : "Submit"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddProduct;
