import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, TextField, Grid, Box} from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth} from './Config';
import Header from './Header';
import '../app.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup()
{
    var [fname,setFname]=useState("");
    var [lname,setLname]=useState("");
    var [email,setEmail]=useState("");
    var [password,setPassword]=useState("");
    var navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('Auth Token'))
            navigate('/home',{replace:true})
    })

    var registerUser= async ()=>{
        try
        {
            var res=await createUserWithEmailAndPassword(auth,email.trim(),password.trim());
            await updateProfile(auth.currentUser, {displayName: fname+" "+lname, photoURL:"http://somedomain/myimage"});
            localStorage.setItem('Auth Token', res._tokenResponse.refreshToken);
            localStorage.setItem('UID',auth.currentUser.uid);
            localStorage.setItem('Name',auth.currentUser.displayName);
            localStorage.setItem('EMAIL',auth.currentUser.email);
            navigate("/home?signup=1", { replace: true });
        }
        catch(error)
        {
            if(error.code === "auth/email-already-in-use")
                toast.error("Error, Account already exists.",{position: toast.POSITION.BOTTOM_RIGHT});
        }
    };

    return (
        <div>
            <Header/>

            <div className="container">
                <div className='myform' sx={{padding:"2% 20% 2% 20%"}}>
                    <h1 style={{color:"#1976d2"}}>Registration</h1> 

                    <Grid container mb={2} spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField id="fname" label="First Name" variant="outlined" fullWidth onChange={(event)=>{setFname(event.target.value)}}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField id="lname" label="Last Name" variant="outlined" fullWidth onChange={(event)=>{setLname(event.target.value)}}/><br/>
                        </Grid>
                    </Grid>

                    <Grid container mb={2} spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField id="email" label="E-Mail Address" variant="outlined" fullWidth onChange={(event)=>{setEmail(event.target.value)}}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField id="password" label="Password" type="password" fullWidth variant="outlined" onChange={(event)=>{setPassword(event.target.value)}}/><br/>
                        </Grid>
                    </Grid>

                    <Grid container mb={2} style={{display:"block"}}>
                        <Grid item mr={1} style={{display:"inline"}}>
                            <Button variant="contained" onClick={registerUser}>Sign Up</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Signup;