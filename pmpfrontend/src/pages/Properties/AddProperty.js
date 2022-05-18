import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { addProperty, addFilesForProperty } from "./service.property";

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

const PropertyTypes=[
  {
    value: 'HOUSE',
    label: 'House',
  },
  {
    value: 'APARTMENT',
    label: 'Apartment',
  },
  {
    value: 'LAND',
    label: 'Land',
  },
  {
    value: 'OFFICE',
    label: 'Office',
  },
]

export default function AddProperty() {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState({
    success: false,
    failed: false,
    successMessage: 'Requested successfully!',
    failureMessage: 'Failed to request campaign!',
  });

  const handleCreate = async () => {
    const listOfPaths = await addFilesForProperty(files);
    try {
      // console.log(listOfPaths);
      // const addedProperty = await addProperty(
      //   property,
      //   address,
      //   user,
      //   listOfPaths
      // );
      setSnackbar({ ...snackbar, success: true });
    } catch (e) {
      setSnackbar({ ...snackbar, failed: true });
    }
  };
  const [files, setFiles] = useState([]);
  const [address, setAddress] = useState({
    city: "",
    state: "",
    zipCode: "",
    street: "",
  });
  const [property, setProperty] = useState({
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    rentAmount: "",
    securityDepositAmount: "",
    propertyType: false,
  });
  const [user, setUser] = useState({
     id: "3adedaeb-3357-4313-a16e-95cf6b2b0f0b",
     email: "meresa27@gmail.com",
     phone: "1234567890",
     firstName: "Meresa",
     lastname: "Gebrewahd",
  });
  const handlePropertyChange = (prop) => (event) => {
    setProperty({ ...property, [prop]: event.target.value });
  };

  const handleAddressChange = (prop) => (event) => {
    setAddress({ ...address, [prop]: event.target.value });
  };
  const handleAdd = async (newFiles) => {
    const path = await addFilesForProperty(newFiles);
    // console.log(path);

    // newFiles = newFiles.filter(
    //   (file) => !files.find((f) => f.data === file.data),
    // );
    // setFiles([...files, path]);
  };

  const handleFileDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid container spacing={2} xs={12}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom color="textPrimary">
            Add your property
          </Typography>
        </Grid>
        <Grid container spacing={1} item xs={6}>
          <Grid item xs={12}>
            <Typography variant="h2">Property information</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="numberOfBedrooms"
              label="numberOfBedrooms"
              fullWidth={true}
              variant="outlined"
              onChange={handlePropertyChange("numberOfBedrooms")}
              value={property.numberOfBedrooms}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="numberOfBathrooms"
              label="numberOfBathrooms"
              fullWidth={true}
              variant="outlined"
              onChange={handlePropertyChange("numberOfBathrooms")}
              value={property.numberOfBathrooms}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="rentAmount"
              label="rentAmount"
              fullWidth={true}
              variant="outlined"
              onChange={handlePropertyChange("rentAmount")}
              value={property.rentAmount}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="securityDepositAmount"
              label="securityDepositAmount"
              fullWidth={true}
              variant="outlined"
              onChange={handlePropertyChange("securityDepositAmount")}
              value={property.securityDepositAmount}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} item xs={6}>
        <Grid item xs={12}>
            <Typography variant="h2">Address information</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="city"
              label="city"
              fullWidth={true}
              variant="outlined"
              onChange={handleAddressChange("city")}
              value={address.city}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="state"
              label="state"
              fullWidth={true}
              variant="outlined"
              onChange={handleAddressChange("state")}
              value={address.state}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="zipCode"
              label="zipCode"
              fullWidth={true}
              variant="outlined"
              onChange={handleAddressChange("zipCode")}
              value={address.zipCode}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="street"
              label="street"
              fullWidth={true}
              variant="outlined"
              onChange={handleAddressChange("street")}
              value={address.street}
            />
          </Grid>
        </Grid>
        <Grid item xs={2}>
            <TextField
              id="propertyType"
              label="propertyType"
              select
              fullWidth={true}
              variant="outlined"
              onChange={handlePropertyChange("propertyType")}
              value={property.propertyType}
              helperText="Please select your Property Type"
            >
                  {PropertyTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
            </TextField>
          </Grid>

        <Grid xs={12} item>
          <DropzoneAreaBase
            acceptedFiles={["image/*", "video/*", "application/*"]}
            fileObjects={files}
            maxFileSize={50000000}
            onAdd={handleAdd}
            filesLimit={20}
            onDelete={handleFileDelete}
          />
        </Grid>
      </Grid>
      <Button onClick={handleCreate}>Add</Button>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </Grid>
  );
}
