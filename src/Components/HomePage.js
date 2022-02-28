import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainHeader from './MainHeader';

function HomePage()
{
    var [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(()=>{
        if(searchParams.get("signup"))
        {
            toast.success("Registration Was Successful!",{position: toast.POSITION.BOTTOM_RIGHT});
        }
    });

    return (
        <>
            <MainHeader/>
            <h1>HomePage Area</h1>

            <ToastContainer/>
        </>
    );
}

export default HomePage;