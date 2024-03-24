import React,{useState,useEffect} from "react"
import {useNavigate} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Header from './Header'
import Alert from "@mui/material/Alert";
function AddProduct(){
    const navigate = useNavigate()
    const [name,setName]=useState("");
    const [file,setFile]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const [error, setError] = useState("");
    async function SaveData(){

        const formData=new FormData();
        formData.append("file",file);
        formData.append("name",name);
        formData.append("description",description);
        formData.append("price",price);

        let results=await fetch("http://127.0.0.1:8000/api/add",{
            method:'POST',
            body:formData
        });
        results=await results.json();
        console.log("result",results);
        if(!results.error){
            
            navigate('/');
        }else{
            setError(results.error);
        }
        
        // results=await results.json();
        // console.log("result",results);
        // localStorage.setItem("user-info",JSON.stringify(results));
        // navigate('/add');
        
    }
    return(
        <>
        <Header />
            <div>
                <div className="col-sm-6 offset-sm-3">
                    <Typography style={{ marginBottom: "20px" }} variant="h3" component="h3">Add Product</Typography>
                    {error && (
                        <Alert style={{ marginBottom: "20px" }} severity="error">
                        {error}
                        </Alert>
                    )}
                    <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Product Name" variant="filled" /><br/>
                    <input type="file"  onChange={(e)=>setFile(e.target.files[0])} className="form-control" placeholder="Product File Upload Email" variant="filled" /><br/>
                    <input type="text"  onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Producst Descrition" variant="filled" /><br/>
                    <input type="text" onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Producst Price" variant="filled" /><br/>
                    <button onClick={SaveData} className="btn btn-primary">Save Product</button>
                </div>
            </div>

        </>
    )
}
export default AddProduct