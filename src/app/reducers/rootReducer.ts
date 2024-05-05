import { combineReducers } from "@reduxjs/toolkit"
import postReducer from "../slices/postSlice"
import dataPostReducer from "../slices/datapost"
import dataNodeReducer from "../slices/nodeData"
import treeReducer from "../slices/treeNumber"
import profileReducer from "../slices/profileSlice"
import postValueReducer from "../slices/postValue"
const rootReducer=combineReducers({
    post:postReducer,
    datapost:dataPostReducer,
    nodeData:dataNodeReducer,
    tree:treeReducer,
    profile:profileReducer,
    postValue:postValueReducer
    
})
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer