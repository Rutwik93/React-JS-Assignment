import MainHeader from './MainHeader';
import {db} from './Config';
import {collection, query, where, getDocs} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import ElectronicsListing from './ElectronicsListing';

function Electronics()
{
    const Products=[];
    var [products,setProducts]=useState([]);
    
    useEffect(()=>{
        var myfun=async ()=>{
            var q = await query(collection(db, "Products"), where("Category", "==", "Electronics"));
            var results=await getDocs(q);
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
            <ElectronicsListing prodArray={products}/>
            </div>
        </>
    );
}

export default Electronics;