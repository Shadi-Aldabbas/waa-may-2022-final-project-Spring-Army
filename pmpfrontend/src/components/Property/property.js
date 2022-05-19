import React, { useContext, useState } from "react";
import axios from "axios";
import moment from "moment";

import { Typography, Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NumberFormat from "react-number-format";
import AttachMoney from "@material-ui/icons/AttachMoney";
import DeleteIcon from "@material-ui/icons/Delete";
import axiosInstance from "../../utils/interceptor";
import { paymentWithStrip } from "../../pages/Properties/service.property";

import { deleteProperty } from "../../pages/Properties/service.property";
import { UserContext } from "../../ourUserContext";

import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Paper: {
    padding: "20px 0px 20px 0px !important",
    margin: "20px !important",
    borderRadius: "10px",
  },
  secondary: {
    backgroundColor: "#c70000",
  },
  Button: {
    margin: "20px 0px 20px 10px !important",
  },
  TextField: {
    margin: "20px 0px 20px 0px !important",
  },
  stripeButton: {
    color: "red !important",
  },
}));

export default function Property({ data, handleDelete }) {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [userRole, setUSerRole] = useState(
    userData.roles.includes("admin")
      ? "admin"
      : userData.roles.includes("landlord")
      ? "landlord"
      : "tenant",
  );
  const publishableKey =
    "pk_test_51KyhH9HIoQnhhgnMLhLiuKU8EkKdT0V6eUBzIJiKKcUw0u7YlgGdSxNlYCJLh4QiMCz0bfLdQIldzC8QXTNndJ2C00fk1i4QWh";
  const stripePrice = data?.rentAmount * 100;
  console.log(data);
  const onToken = (token) => {
    axiosInstance
      .post("http://localhost:8080/api/v1/payment", {
        amount: stripePrice,
        token,
      })
      .then((response) => {
        console.log({
          owner: {
            id: data.ownedBy.id,
          },
          price: parseFloat(data?.rentAmount),
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().add(30, "days").format("YYYY-MM-DD"),
          isDeleted: false,
          property: data,
        });
        axiosInstance
          .post("http://localhost:8080/api/v1/rent", {
            owner: {
              id: data.ownedBy.id,
            },
            price: parseFloat(data?.rentAmount),
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().add(30, "days").format("YYYY-MM-DD"),
            isDeleted: false,
            property: data,
          })
          .then((response) => {
            console.log(response);
          });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Paper className={classes.Paper}>
        <Grid item align="center" xs={12}>
          <Link
            to={"/app/properties/ViewProperty/" + data?.id}
            style={{ textDecoration: "none" }}
          >
            <img
              width="360px"
              height="300px"
              src={
                data?.photos.length != 0
                  ? data.photos[0]
                  : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              }
            />
          </Link>

          <Grid item align="start" xs={11}>
            <Typography variant="h4">
              <NumberFormat
                value={data?.rentAmount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Typography>
          </Grid>
          <Grid item align="start" xs={11}>
            <Typography variant="body1">
              {data?.propertyType} {data?.numberOfBedrooms} bds{" "}
              {data?.numberOfBathrooms} bths - for rent
            </Typography>
          </Grid>
          <Grid item align="start" xs={11}>
            <Typography variant="body1">
              {data?.address?.state} {data?.address?.city}{" "}
              {data?.address?.street} - {data?.address?.zipCode}
            </Typography>
          </Grid>
          <Grid item align="start" xs={11}>
            <Typography variant="caption">
              {data?.ownedBy?.firstName} {data?.ownedBy?.lastname}{" "}
            </Typography>
          </Grid>
          <Grid item align="end" xs={11}>
            {userRole !== "tenant" ? (
              <Button
                className={`${classes.Button} ${classes.secondary}`}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(data)}
              >
                Delete
              </Button>
            ) : (
              ""
            )}

            {userRole === "tenant" ? (
              <StripeCheckout
                className={classes.stripeButton}
                amount={stripePrice}
                label="Rent"
                panelLabel="Rent"
                token={onToken}
                stripeKey={publishableKey}
                currency="USD"
                bitcoin={true}
                alipay={true}
              >
                <Button
                  className={classes.Button}
                  variant="contained"
                  color="primary"
                  startIcon={<AttachMoney />}
                >
                  Rent
                </Button>
              </StripeCheckout>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
