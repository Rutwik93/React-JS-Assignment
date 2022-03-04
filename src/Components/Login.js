import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from './Config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../app.css';
import {Button, TextField, Grid} from '@mui/material';
import Header from './Header';

function Login()
{
    var [email,setEmail]=useState("");
    var [password,setPassword]=useState("");
    var navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('Auth Token'))
            navigate('/home',{replace:true})
    })

    var checkLogin=async ()=>{
        try
        {
            var res=await signInWithEmailAndPassword(auth,email,password);
            localStorage.setItem('Auth Token', res._tokenResponse.refreshToken);
            localStorage.setItem('UID',auth.currentUser.uid);
            localStorage.setItem('Name',auth.currentUser.displayName);
            localStorage.setItem('EMAIL',auth.currentUser.email);
            navigate("/home", { replace: true });
        }
        catch(error)
        {
            if(error.code==="auth/wrong-password")
                toast.error("Invalid Password, Please Try Again.",{position: toast.POSITION.BOTTOM_RIGHT});

            if(error.code==="auth/user-not-found")
                toast.error("Invalid Credentials, Please Try Again.",{position: toast.POSITION.BOTTOM_RIGHT});

            if(error.code==="auth/too-many-requests")
                toast.error("Too Many Requests, Hold on!",{position: toast.POSITION.BOTTOM_RIGHT});
        }
    };

    return (
        <div>
            <Header/>
            <div className="container">
                <div className='myform'>
                    <h1 style={{color:"#1976d2"}}>Login</h1>
                    <Grid container mb={2} spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField id="email" label="E-Mail Address" type="email" fullWidth variant="outlined" onChange={(event)=>{setEmail(event.target.value)}}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField id="password" label="Password" type="password" fullWidth variant="outlined" onChange={(event)=>{setPassword(event.target.value)}}/><br/>
                        </Grid>
                    </Grid>

                    <Grid container mb={2} style={{display:"block"}}>
                        <Grid item mr={1} style={{display:"inline"}}>
                            <Button variant="contained" onClick={checkLogin}>Log-in</Button>
                        </Grid>
                    </Grid>      
                </div>
            </div>
            <ToastContainer/>        
        </div>
    );
}

export default Login;