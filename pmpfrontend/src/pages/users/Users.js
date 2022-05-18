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
import { getAllUsers } from "./service.user";
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

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    const fetch = async () =>{
      const userData = await getAllUsers();
      setUsers(userData.data);
      console.log(userData);
    }
    fetch();
  }, []);

  const handleDelete = async (item) => {
    console.log(item)
    // try {
    //   const deleteUser = await deleteProperty(
    //     item.id
    //   ).then(result =>{
        
    //     toast(result.message)
    //     setFetchAgain(!fetchAgain)
    //   });
    //   // setSnackbar({ ...snackbar, success: true });
    // } catch (e) {
    //   // setSnackbar({ ...snackbar, failed: true });
    // }
  };
  
  return (
    <>
     <PageTitle title="Users" />
     <Grid container spacing={4}>
     <Grid item xs={12}>
     <MUIDataTable
          title="All Users"
          
          data={
            users
              ? users.map((item) => {
                  return [
                    item.firstName,
                    item.lastname,
                    item.email,
                    item.role.name,
                    
                  ];
                })
              : ["1","1","1","1","1"]
          }
          columns={[
            "First Name",
            "Last Name",
            "Email",
            "Role",
          ]}
          options={{
            onRowsDelete:(item)=>{
              console.log(this)
              handleDelete(item)
            },
            rowsPerPageOptions: [],
            elevation: 0,
            rowsPerPage: 10,
            download: true,
          }}
        />
        </Grid>
       <Button >test</Button>
      </Grid>
    </>
  );
}
