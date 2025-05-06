
import {createSlice} from "@reduxjs/toolkit"
const initialState={
    videos:[],
    videosCount:0
}

const videoSlice=createSlice({
    name:"videos",
    initialState,
    reducers:{
        addtoSaveLater:(state:any,action) =>{
            state.videos.push(action.payload)
            state.videosCount=state.videos.length;
        }
    }
})

export const {addtoSaveLater}=videoSlice.actions;
export default videoSlice.reducer;