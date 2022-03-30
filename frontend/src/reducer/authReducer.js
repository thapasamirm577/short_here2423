import { createSlice } from "@reduxjs/toolkit";
import { displayUser, loginUser, registerUser } from "./action";

const initialState = {
    loading: false,
    error: "",
    message: "",
    data: [],
}

const authSlice = createSlice({
    name: "authShortenurl",
    initialState: initialState,
    reducers: {
        addLogin: (state,action)=>{
            state.loginInfo = true;
        }
    },
    extraReducers:{
        [registerUser.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
            
        },
        [registerUser.pending]: (state,action)=>{
            state.loading = true;
        },
        [displayUser.fulfilled]: (state,action)=>{
            state.loading = false;
            state.data = action.payload.data;

        },
        [displayUser.pending]: (state,action)=>{
            state.loading = true;
        },
        [displayUser.rejected]:(state,action)=>{
            state.loading = false;
            
        },
        [loginUser.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
            localStorage.setItem("shortToken", action.payload.token);
            state.data = action.payload.data;
            localStorage.setItem("name",action.payload.data[0].name);

        },
        [loginUser.pending]: (state,action)=>{
            state.loading = true;
            //console.log("pending")
        },
        [loginUser.rejected]:(state,action)=>{
            state.loading = false;
            //console.log("rejected")
        },
        
    }

})

export const authActions = authSlice.actions;
export default authSlice.reducer;