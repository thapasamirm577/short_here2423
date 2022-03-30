import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
    "registeraction",
    async(data)=>{
        const res = await fetch("/register",{
            method: "post",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
);

export const loginUser = createAsyncThunk(
    "loginaction",
    async(data)=>{
        const res = await fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("shortToken")
            },
            body: JSON.stringify(data)
        })
        //console.log(await res.json());
        return await res.json();
    }
)


export const displayUser = createAsyncThunk(
    "loginaction",
    async()=>{
        const res = await fetch("/displayuser",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("shortToken")
            }
        });
        return await res.json();
    }
)

