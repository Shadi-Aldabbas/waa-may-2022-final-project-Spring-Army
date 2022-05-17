import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Property from "../../components/Property/property";
import { getAllProperties } from "./service.property";
const PropertiesData = [
  {
    id: "1",
    address: {
      city: "Fairfield",
      state: "Iowa",
      zipCode: 52557,
      street: "1000 N St.",
    },
    rentAmount: 200000,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    ownedBy: {
      firstName: "Meresa",
      lastname: "Yilmaz",
      email: "saldabbas@miu.edu",
    },
    propertyType: "Apartment",
  }
];

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function Properties() {
  const classes = useStyles();
  const [properties, setProperties] = useState([]);



  useEffect(() => {
    const fetch = async () =>{
      const propertiesData = await getAllProperties();
      setProperties(propertiesData.data);
      console.log(properties);
    }
    fetch();
  }, []);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={{ xs: 12, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {properties?.map((item) => {
          return (
            <Grid item xs={3}>
              <Property data={item}></Property>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
