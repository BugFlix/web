import { combineReducers } from "@reduxjs/toolkit"
import postReducer from "../slices/postSlice"
import dataPostReducer from "../slices/datapost"

const rootReducer=combineReducers({
    post:postReducer,
    datapost:dataPostReducer
})
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer