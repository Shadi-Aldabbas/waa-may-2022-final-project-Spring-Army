import React, { useState, useEffect,useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography, Grid, Paper, Button } from "@material-ui/core";
import AttachMoney from "@material-ui/icons/AttachMoney";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useParams } from "react-router-dom";
import { getPropertyById } from "./service.property";
import StripeCheckout from "react-stripe-checkout";
import NumberFormat from "react-number-format";
import { UserContext } from "../../ourUserContext";
import axiosInstance from "../../utils/interceptor";
const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
  ];
  

  

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

export default function ViewPropery() {
    const { userData } = useContext(UserContext);
    const classes = useStyles();
    const [userRole, setUSerRole] = useState(
      userData.roles.includes("admin")
        ? "admin"
        : userData.roles.includes("landlord")
        ? "landlord"
        : "tenant",
    );
    const { id } = useParams();
    const [properties, setProperties] = useState();
  useEffect(() => {
     
     const fetch = async () =>{
        const propertiesData = await getPropertyById(id)
        console.log(propertiesData.data.photos)
       setProperties(propertiesData.data)
      }
      fetch();
  }, []);
  const publishableKey =
  "pk_test_51KyhH9HIoQnhhgnMLhLiuKU8EkKdT0V6eUBzIJiKKcUw0u7YlgGdSxNlYCJLh4QiMCz0bfLdQIldzC8QXTNndJ2C00fk1i4QWh";

  const onToken = (token) => {
    axiosInstance
      .post("http://localhost:8080/api/v1/payment", {
        amount: stripePrice,
        token,
      })
      .then((response) => {
        console.log({
          owner: {
            id:properties.ownedBy.id
            },
            price:parseFloat(properties?.rentAmount),
            startDate:moment().format('YYYY-MM-DD'),
            endDate:moment().add(30, 'days').format('YYYY-MM-DD'),
            isDeleted: false,
            property: properties
        });
        axiosInstance.post("http://localhost:8080/api/v1/rent", {
          owner: {
            id:properties.ownedBy.id
            },
            price:parseFloat(properties?.rentAmount),
            startDate:moment().format('YYYY-MM-DD'),
            endDate:moment().add(30, 'days').format('YYYY-MM-DD'),
            isDeleted: false,
            property: properties
        }).then((response)=>{
          console.log(response);
        })
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const stripePrice = properties?.rentAmount * 100;
  
  return (
    <>
     <PageTitle title="Property Details" />
     <Grid container  spacing={4} >
         <Grid xs={12}>
         <Carousel >
       {
           properties ? properties.photos.map(x=>{
               return (
                <div style={{height:"700px"}}>
                <img src={x} />
              
               </div>
               )
               
           })
          
           
          :
          <div></div>
          
       }
               
            
               
            </Carousel>
            <Grid item align="start" xs={11}>
            <Typography variant="h4">
              <NumberFormat
                value={properties?.rentAmount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Typography>
          </Grid>
          <Grid item align="start" xs={11}>
            <Typography variant="body1">
              {properties?.propertyType} {properties?.numberOfBedrooms} bds{" "}
              {properties?.numberOfBathrooms} bths - for rent
            </Typography>
          </Grid>
          <Grid item align="start" xs={11}>
            <Typography variant="body1">
              {properties?.address?.state} {properties?.address?.city}{" "}
              {properties?.address?.street} - {properties?.address?.zipCode}
            </Typography>
          </Grid>
          <Grid item align="start" xs={11}>
            <Typography variant="caption">
              {properties?.ownedBy?.firstName} {properties?.ownedBy?.lastname}{" "}
            </Typography>
          </Grid>
          <Grid item align="end" xs={11}>
          

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
   
      </Grid>
    </>
  );
}