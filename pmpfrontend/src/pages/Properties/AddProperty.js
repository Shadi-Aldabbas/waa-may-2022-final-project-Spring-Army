import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  InputAdornment,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DropzoneAreaBase } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

const PropertyTypes=[
  {
    value: 'Apartment',
    label: 'Apartment',
  },
  {
    value: 'Garage',
    label: 'Garage',
  },
  {
    value: 'Office',
    label: 'Office',
  },
 
]

export default function AddProperty() {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [address, setAddress] = React.useState({
    city: "",
    state: "",
    zipCode: "",
    street: "",
  });
  const [property, setProperty] = React.useState({
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    rentAmount: "",
    securityDepositAmount: "",
    propertyType: false,
  });
  const handlePropertyChange = (prop) => (event) => {
    setProperty({ ...property, [prop]: event.target.value });
  };

  const handleAddressChange = (prop) => (event) => {
    setAddress({ ...address, [prop]: event.target.value });
  };
  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data),
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (deleted) => {
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
            maxFileSize={500000}
            onAdd={handleAdd}
            filesLimit={20}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
