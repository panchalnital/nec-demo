import React,{useState,useEffect} from "react"
import { Table } from "react-bootstrap"
import { Link, link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Header from './Header'
function ProductList(){

    const [data,setData]=useState([]);
    useEffect(()=>{
        
        fetchMyAPI() 
    },[])
    async function deleteID(id){
        let result=await fetch("http://127.0.0.1:8000/api/delete/"+id,{
            method:'DELETE'
        });
        result= await result.json();
        console.log("data",result);
        fetchMyAPI() 
    }
    // async function editID(id){
    //     let result=await fetch("http://127.0.0.1:8000/api/getProducts/"+id,{
    //         method:'GET'
    //     });
    //     result= await result.json();
    //     console.log("data",result);
    //     fetchMyAPI() 
    // }
    async function fetchMyAPI() {
        let results= await fetch("http://127.0.0.1:8000/api/list");
        results= await results.json();
        setData(results)
        console.log("data",results);
    }
    return(
        <>
        <Header />
            <div>
                
                <Typography style={{ marginBottom: "20px" }} variant="h3" component="h3">Product List</Typography>
                <div className="col-sm-8 offset-sm-2">
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item)=>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td><img style={{width:50}} src={"http://127.0.0.1:8000/"+item.file_path}/></td>
                                <td><span onClick={()=>{deleteID(item.id)}} className="delete">Delete</span> </td> 
                                <td><Link to={"update/"+item.id}><span className="edit">Edit</span></Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ProductList
