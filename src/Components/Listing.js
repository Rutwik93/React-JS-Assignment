import MainHeader from './MainHeader';
import {db} from './Config';
import {collection, query, where, getDocs} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
import ProductsListing from './ProductsListing';
import CircularProgress from '@mui/material/CircularProgress';

function Listing()
{
    const Products=[];
    var [products,setProducts]=useState([]);
    var [loading,setLoading]=useState(true);
    var [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        var myfun=async ()=>{
            var q = await query(collection(db, "Products"), where("Category", "==", searchParams.get("Category")));
            var results=await getDocs(q);  
            setLoading(false);
            
            results.forEach(item => {
                Products.push({
                    id:item.id,
                    details:item.data()
                });
            });
            setProducts(Products);
        }
        myfun();
    },[]);

    return (
        <>
            <MainHeader/>
            <div style={{textAlign:"center"}}>
            <ProductsListing prodArray={products}/>
            </div>
            {loading?<div className="txtCenter"><CircularProgress /> Loading...</div>:null}
        </>
    );
}

export default Listing;