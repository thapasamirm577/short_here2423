import { creatingLink, creatingNoAuthLink, deletingLink, displayingLink } from "./linkAction";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    loading: false,
    error: "",
    message: "",
    data:[],
}
const linkSlice = createSlice({
    name: "linkshere",
    initialState: initialState,
    reducers:{

    },
    extraReducers:{
        [creatingLink.fulfilled]: (state,action)=>{
            state.loading = false;
            if(action.payload.error){
                state.error = action.payload.error;
            }
            state.message = action.payload.message;
            state.data = action.payload.data;
        },
        [creatingLink.pending]: (state,action)=>{
            state.loading = true
        },
        [creatingLink.rejected]: (state,action)=>{
            state.loading = false
        },
        [creatingNoAuthLink.fulfilled]: (state,action)=>{
            state.loading = false;
            if(action.payload.error){
                state.error = action.payload.error;
            }
            state.message = action.payload.message;
            state.data = action.payload.data;
        },
        [creatingNoAuthLink.pending]: (state,action)=>{
            state.loading = true
        },
        [creatingNoAuthLink.rejected]: (state,action)=>{
            state.loading = false
        },
        [displayingLink.fulfilled]: (state,action)=>{
            state.loading = false;
            //console.log(action.payload)
            if(action.payload.error){
                state.error = action.payload.error;
            }
            state.message = action.payload.message;
            state.data = action.payload.data;
        },
        [displayingLink.pending]: (state,action)=>{
            state.loading = true
        },
        [displayingLink.rejected]: (state,action)=>{
            state.loading = false
        },
        [deletingLink.fulfilled]: (state,action)=>{
            state.loading = false;
            if(action.payload.error){
                state.error = action.payload.error;
            }
            state.message = action.payload.message;
            const nonDeleting = state.data.filter(item=>item._id !== action.payload.data._id);
            state.data = nonDeleting;
        },
        [deletingLink.pending]: (state,action)=>{
            state.loading = true
        },
        [deletingLink.rejected]: (state,action)=>{
            state.loading = false
        }
    }
})


export default linkSlice.reducer;