import { combineReducers } from "@reduxjs/toolkit"
import postReducer from "../slices/postSlice"
import dataPostReducer from "../slices/datapost"
import dataNodeReducer from "../slices/nodeData"
import treeReducer from "../slices/treeNumber"
const rootReducer=combineReducers({
    post:postReducer,
    datapost:dataPostReducer,
    nodeData:dataNodeReducer,
    tree:treeReducer
    
})
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer