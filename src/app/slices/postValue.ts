import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState= {
  value: [],
};

const postValueSlice = createSlice({
    name: 'postValue',
    initialState,
    reducers: {
      setPostValue: (state, action: PayloadAction<[]>) => {
        state.value = action.payload;
    },
    },
});

export const { setPostValue} =postValueSlice.actions;
export default postValueSlice.reducer;