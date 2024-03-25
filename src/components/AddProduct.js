import React,{useState,useEffect} from "react"
import {useNavigate} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Header from './Header'
import Alert from "@mui/material/Alert";
function AddProduct(){
    const navigate = useNavigate()
    const user=JSON.parse(localStorage.getItem('user-info'));
    const [action, setAction] = useState("saveFile");
    const [file,setFile]=useState("");
    const [user_id,setUserid]=useState(user.id);
    const [error, setError] = useState("");
    async function SaveData(){


        if(file==''){
            setError("Required for Name field!");
            return false;
        }
        const formData=new FormData();
        formData.append("file",file);
        formData.append("action",action);
        formData.append("user_id",user_id);
        let results=await fetch("http://localhost/nce-demo/api/app/Controller/ProductsController.php",{
        //let results=await fetch("http://127.0.0.1:8000/api/add",{
            method:'POST',
            body:formData
        });
        results=await results.json();
        console.log("result",results);
        
        if(results.status=='success'){
            //localStorage.setItem("user-info",JSON.stringify(results.data[0]));
            navigate('/');
        }else{
            setError(results.message);
        }

        
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
                    <input type="hidden" onChange={(e)=>setAction(e.target.value)} className="form-control" placeholder="Product Name" variant="filled" /><br/>
                    <input type="hidden" onChange={(e)=>setUserid(e.target.value)} className="form-control" placeholder="Product Name" variant="filled" /><br/>
                    <input type="file"  onChange={(e)=>setFile(e.target.files[0])} className="form-control" placeholder="Product File Upload Email" variant="filled" /><br/>
                   
                    <button onClick={SaveData} className="btn btn-primary">Save Product</button>
                </div>
            </div>

        </>
    )
}
export default AddProduct