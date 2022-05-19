import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import mock from "../dashboard/mock";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useParams } from "react-router-dom";
import { getPropertyById } from "./service.property";
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
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function ViewPropery() {
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
          <div>asdas</div>
          
       }
               
            
               
            </Carousel>
         </Grid>
   
       <Button >test</Button>
      </Grid>
    </>
  );
}