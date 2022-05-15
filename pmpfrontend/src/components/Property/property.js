import React from "react";
import { Typography, Grid, Paper, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NumberFormat from "react-number-format";
import AttachMoney from "@material-ui/icons/AttachMoney";
import DeleteIcon from "@material-ui/icons/Delete";
// import DeleteIcon from "@mui/material-icons/Delete";
// import SendIcon from "@mui/material-icons/Send";
// import Stack from "@material-ui/Stack";

const useStyles = makeStyles((theme) => ({
  Paper: {
    //   paddingTop: "20px !important",
    //   paddingBottom: "20px !important",
      padding: "20px 0px 20px 0px !important",
    margin: "20px !important",
    borderRadius: "10px",
  },
  secondary:{
      backgroundColor:"#c70000"
},
Button:{
    margin: "20px 0px 20px 10px !important",

}
}));

export default function Property({ data }) {
  const classes = useStyles();

  return (
    <Paper className={classes.Paper}>
      <Grid item align="center" xs={12}>
        <img
          width="360px"
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
        <Grid item align="start" xs={11}>
          <Typography variant="h4">
            <NumberFormat
              value={data.rentAmount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </Typography>
        </Grid>
        <Grid item align="start" xs={11}>
          <Typography variant="body1">
            {data.propertyType} {data.numberOfBedrooms} bds{" "}
            {data.numberOfBathrooms} bths - for rent
          </Typography>
        </Grid>
        <Grid item align="start" xs={11}>
          <Typography variant="body1">
            {data.address.state} {data.address.city} {data.address.street} -{" "}
            {data.address.zipCode}
          </Typography>
        </Grid>
        <Grid item align="start" xs={11}>
          <Typography variant="caption">
            {data.ownedBy.firstName} {data.ownedBy.lastname}{" "}
          </Typography>
        </Grid>
        <Grid item align="end" xs={11}>
            <Button className={`${classes.Button} ${classes.secondary}`} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Button className={classes.Button} variant="contained" color="primary" startIcon={<AttachMoney />}>
              Rent Now
            </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
