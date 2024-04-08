import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  nodes: [],
};
const nodeSlice = createSlice({
  name: "nodeState",
  initialState,
  reducers: {
    setNodeData: (state, action) => {
      state.nodes = action.payload;
      //state
    },
  },
});

export const { setNodeData } = nodeSlice.actions;
export default nodeSlice.reducer;
