import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Property from "../../components/Property/property";
import { deleteProperty, getAllProperties } from "./service.property";
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../../ourUserContext";

import 'react-toastify/dist/ReactToastify.css';
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
  const { userData } = useContext(UserContext);
  const [userRole, setUSerRole] = useState(
    userData.roles.includes("admin")
      ? "admin"
      : userData.roles.includes("landlord")
      ? "landlord"
      : "tenant",
  );
  const [properties, setProperties] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);



  useEffect(() => {
    const fetch = async () =>{
      const propertiesData = await getAllProperties();
      setProperties(propertiesData.data);
       console.log(propertiesData);
    }
    fetch();
  }, [fetchAgain]);

  const handleDelete = async (item) => {
    try {
      const addedProperty = await deleteProperty(
        item.id
      ).then(result =>{
        
        toast(result.message)
        setFetchAgain(!fetchAgain)
      });
      // setSnackbar({ ...snackbar, success: true });
    } catch (e) {
      // setSnackbar({ ...snackbar, failed: true });
    }
  };

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
            <>
               <ToastContainer position="top-center"/>
            <Grid item xs={3}>
              <Property data={item} handleDelete={handleDelete} ></Property>
            </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}
