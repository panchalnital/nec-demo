import React,{useState,useEffect} from "react"
import { Table } from "react-bootstrap"
import { Link, link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Header from './Header'
function ProductList(){
    const user=JSON.parse(localStorage.getItem('user-info'));
   
    const [resultList,setData]=useState([]);

    const [user_id, setuser] = useState(user.id);
    const [action, setAction] = useState("list");
   
    useEffect(()=>{
        
        fetchMyAPI() 
    },[])
    async function deleteID(id){
        let result=await fetch("http://localhost/nce-demo/api/app/Controller/ProductsController.php"+id,{
            method:'DELETE'
        });
        result= await result.json();
        console.log("data",result);
        fetchMyAPI() 
    }

    async function fetchMyAPI() {
        let item={user_id,action};
        let results= await fetch("http://localhost/nce-demo/api/app/Controller/ProductsController.php",{
            //method:'GET'
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        results= await results.json();    
        if(results.status=='success'){
            setData(results.data);
        }
        console.log("resultList",resultList);
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
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            resultList.map((items)=>
                            <tr>
                                <td>{items.id}</td>
                                <td><img style={{width:50}} src={"http://127.0.0.1/"+items.file_path}/></td>
                                
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
