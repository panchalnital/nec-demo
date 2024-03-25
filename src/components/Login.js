import React,{useState,useEffect} from "react"
import {useNavigate} from 'react-router-dom';
import { Link, link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Header from './Header'
import Alert from "@mui/material/Alert";
function Login(){
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }
    },[])

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error, setError] = useState("");
    const [action, setAction] = useState("login");
    
    async function signIn(){
        let item={email,password,action};

        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };
        if(email.trim()=="" || email!==""){            
            if(email.trim()==''){
                setError("Required for email field!");
                return false;
            }
            else if(!validateEmail(email)) {
                setError("please enter valid email address!");
                return false;
            }
        }

        if(password==''){
            setError("Required for password field!");
            return false;
        }
        //let results=await fetch("http://127.0.0.1:8000/api/login",{
       let results=await fetch("http://localhost/nce-demo/api/app/Controller/UserController.php",{
            
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        results=await results.json();
        //console.log("result",results.data[0]);
        if(results.status=='success'){
            localStorage.setItem("user-info",JSON.stringify(results.data[0]));
            navigate('/');
        }else{
            setError(results.message);
        }
    
        
    }

    return(
        <>
        <Header />
      
        <div className="col-sm-6 offset-sm-3">
       
            <Typography style={{ marginBottom: "20px" }} variant="h3" component="h3">Log in</Typography>
            {error && (
            <Alert style={{ marginBottom: "20px" }} severity="error">
                {error}
                </Alert>
            )}
                <input type="hidden" value={action} onChange={(e)=>setAction(e.target.value)}/><br/>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="User Email" variant="filled"/><br/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" variant="filled"/><br/>
            <button onClick={signIn} className="btn btn-primary">Sing In</button>

            <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
           
        </div>
        </>
    )
}
export default Login