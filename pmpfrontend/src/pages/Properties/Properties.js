import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Property from "../../components/Property/property";

const PropertiesData = [
  {
    id: "1",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 200000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "2",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 20000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "3",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 2000000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "4",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 2000000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "5",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 2000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "5",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 2000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "5",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 2000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "5",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 2000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "5",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 2000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
    },
    propertyType: "Apartment",
  },
  {
    id: "5",
    address: {
      city: "Fairfield",
      state:"Iowa",
      zipCode:52557,
      street:"1000 N St."
    },
    rentAmount: 2000,
    numberOfBedrooms:2,
    numberOfBathrooms:2,
    ownedBy:{
      firstName:"Meresa",
      lastname:"Yilmaz",
      email:"saldabbas@miu.edu"
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
        {PropertiesData.map((item) => {
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
