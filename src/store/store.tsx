import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "../slicers/slicer";


export default configureStore({
    reducer:videoSlice
})

