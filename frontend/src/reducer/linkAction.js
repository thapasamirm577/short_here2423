const { createAsyncThunk } = require("@reduxjs/toolkit");

//thunk for creating link
export const creatingLink = createAsyncThunk(
    "cretinglinkhere",
    async(data)=>{
        const res = await fetch("/create",{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("shortToken")
            },
            body: JSON.stringify(data)
        })
        return await res.json();
    }
)

//thunk for displaying link
export const displayingLink = createAsyncThunk(
    "displaylinkhere",
    async()=>{
        const res = await fetch("/display",{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("shortToken")
            }
        })
        return await res.json();
    }
)


//thunk for deleting link
export const deletingLink = createAsyncThunk(
    "deletelinkhere",
    async(id)=>{
        const res = await fetch(`/delete/${id}`,{
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("shortToken")
            }
        })
        return await res.json();
    }
)