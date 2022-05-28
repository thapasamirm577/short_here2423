import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayingLink } from '../../reducer/linkAction';
import Layout from '../layout';
import IndvLink from './indvLink';
import classes from "./mylink.module.css";

const Mylink = () => {

    const dispatch = useDispatch();
    const data = useSelector(state=>state.link.data);
    const loading = useSelector(state=>state.link.loading);

    //fetching links
    useEffect(()=>{
        dispatch(displayingLink());
    },[])

    
    //console.log(data);
    return (
        <Layout>
            <header className={classes.container_mylink_header}>
                My Link
            </header>
            { loading && <div className={classes.loading_mylink}>Loading</div>}
            { data?.length > 0 && 
            data.map((item, key)=>{return (
               <IndvLink item={item} key={key} />
            )})}
        </Layout>
    )
}

export default Mylink