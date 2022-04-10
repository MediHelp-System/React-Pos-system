import React, {useEffect, useState} from 'react'
// import {Link, Route, useHistory} from 'react-router-dom';
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import "../assets/css/Brands.css";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from 'react-bootstrap/Button';
import Grid from '@mui/material/Grid';


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    typography: {
        fontFamily: 'SF-Pro-Text',
    },
});

const Brands = () => {

    const [Name,setName] = useState()

    const[formError, setformError] = useState()
    const[formSuccess, setformSuccess] = useState()
    const[error, seterror] = useState()

    const[brands, setbrands] = useState([])

    const [status,setstatus] = useState(false)

    const updateName = (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/brand/get/').then((response) => {
            setbrands(response.data.data);
        });
    }, [status]);

    const submit =(e) =>{
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/brand/register/', {
            name: Name
        })
            .then(function (response) {
                console.log(response);
                setformError(false);
                setformSuccess(true);
                setstatus(true)
            })
            .catch(function (error) {
                console.log(error);
                setformError(true);
                setformSuccess(false);
                seterror(error);
            });
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Brand name',
            width: 200,
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
        
                const element = document.querySelector('#delete-request-error-handling .status');
                axios.delete('http://127.0.0.1:8000/api/brand/delete/1')
                    .then(response => element.innerHTML = 'Delete successful')
                    .catch(error => {
                        element.parentElement.innerHTML = `Error: ${error.message}`;
                        console.error('There was an error!', error);
                    });
              };
        
              return <Button onClick={onClick}>Delete</Button>;
            }
          },
    ];


    return (
        <>
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <div className="row">
                        <div className="col-6">
                            <div className="card full-height">
                                <div>
                                    <h2 className="brandtitle">Brand Details</h2>
                                    <form onSubmit={submit}>
                                        {formSuccess ? (
                                            <Alert severity="success">
                                                <AlertTitle>Success</AlertTitle>
                                                Brand registration was <strong>successful!</strong>
                                            </Alert>
                                        ) : null }
                                        {formError ? (
                                            <Alert severity="error">
                                                <AlertTitle>Error</AlertTitle>
                                                {error} — <strong>check it out!</strong>
                                            </Alert>
                                        ) : null
                                        }
                                        <div className="rowbrands">
                                            <label>Name *</label>
                                            <input type="text" autoFocus placeholder="" value={Name} onChange={(e) => updateName(e)}
                                                    required/>
                                        </div>
                                        {/* <div className="rowbrands">
                                            <label>Brand ID</label>
                                            <input type="text" autoFocus placeholder="" value="#"
                                                   required/>
                                        </div> */}
                                        {/*<div className="rowuser">*/}
                                        {/*    <label>Device Type</label>*/}
                                        {/*    <select id="department" name="department" value={deviceTypeId}*/}
                                        {/*            onChange={(e) => setdeviceTypeId(e.target.value)} required>*/}
                                        {/*        <option value="" selected></option>*/}
                                        {/*        {listData4.lists.map((country, key) => (*/}
                                        {/*            <option key={key} value={country.id}>*/}
                                        {/*                {country.deviceTypename}*/}
                                        {/*            </option>*/}
                                        {/*        ))}*/}
                                        {/*    </select>*/}
                                        {/*</div>*/}
                                        <div id="button" className="rowbrandsbutton">
                                            <button type="submit" >Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card full-height">
                        <div style={{ height: 400, width: '100%'}}>
                            <DataGrid
                                theme={useStyles}
                                rows={brands}
                                columns={columns}
                                pageSize={5}
                                // checkboxSelection
                                disableSelectionOnClick
                                // onSelectionModelChange={(e) => {
                                //     const selectedIDs = new Set(e.selectionModel);
                                //     const selectedRowData = listData1.lists.filter((row) =>
                                //         selectedIDs.has(row.id)
                                //     );
                                //     setemailreceipents(selectedRowData)
                                //     console.log("selected rowData:", selectedRowData);
                                // }}
                                // selectionModel={selectionModel}
                            />
                        </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Brands
