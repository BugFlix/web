import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface treeState{
    canvasId:number|null,
    key:string|null,
    title:string|null
}
const initialState: treeState = {
    canvasId: null,
    key:null,
    title:null
};

const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {
      setCanvasId: (state, action: PayloadAction<number | null>) => {
        state.canvasId = action.payload;
      },
      setKey:(state,action:PayloadAction<string | null>)=>{
        state.key=action.payload
      },
      setTitle:(state,action:PayloadAction<string | null>)=>{
        state.title=action.payload
      }
    },
});
export const { setCanvasId,setKey,setTitle } = treeSlice.actions;
export default treeSlice.reducer;