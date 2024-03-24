import React,{useState,useEffect} from "react"
import Header from './Header'
import {useParams} from 'react-router-dom';
function UpdateProduct(props){
    const params = useParams();
    const [data,setData]=useState([]);

    const [name,setName]=useState("");
    const [file,setFile]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");

    useEffect(()=>{   
        fetchMyAPI(params.id) 
    },[])
    async function fetchMyAPI(id) {
        let results= await fetch("http://127.0.0.1:8000/api/getProducts/"+id);
        results= await results.json();
        setData(results)
        setName(results.name)
        setDescription(results.description)
        setPrice(results.price)
        setFile(results.file)
        console.log("data",results);
    }
    console.log("props",params.id);

    async function editData($id){

        const formData=new FormData();
        formData.append("file",file);
        formData.append("name",name);
        formData.append("description",description);
        formData.append("price",price);

        let results=await fetch("http://127.0.0.1:8000/api/updateProducts/"+$id+"?_method=PUT",{
            method:'POST',
            body:formData
        });
        alert("Data has been Updated");
        // results=await results.json();
        // console.log("result",results);
        // localStorage.setItem("user-info",JSON.stringify(results));
        // navigate('/add');
        
    }

    return(
        <div>
             <Header />
            <h1>Update Product Page</h1>
            <div className="col-sm-6 offset-sm-3">
                    <h1>Add Product</h1>
                    <input type="text" defaultValue={data.name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Product Name"/><br/>
                    <input type="file" defaultValue={data.file_path} onChange={(e)=>setFile(e.target.files[0])}className="form-control" placeholder="Product File"/>
                    <img style={{width:50}} src={"http://127.0.0.1:8000/"+data.file_path} className="form-control"/>
                    <br/>
                    <input type="text" defaultValue={data.description
} onChange={(e)=>setDescription(e.target.value)}className="form-control" placeholder="Producst Descrition"/><br/>
                    <input type="text" defaultValue={data.price} onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Producst Price"/><br/>
                    <button onClick={()=>editData(data.id)} className="btn btn-primary">Save Product</button>
                </div>
        </div>
    )
}
export default UpdateProduct