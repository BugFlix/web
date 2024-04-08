import { combineReducers } from "@reduxjs/toolkit"
import postReducer from "../slices/postSlice"
import dataPostReducer from "../slices/datapost"
import dataNodeReducer from "../slices/nodeData"
const rootReducer=combineReducers({
    post:postReducer,
    datapost:dataPostReducer,
    nodeData:dataNodeReducer
    
})
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer